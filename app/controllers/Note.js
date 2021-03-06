const Controller = require('./Base'),
  HttpError = require('standard-http-error'),
  Roles = require('../kernel/Roles')

class Note extends Controller {
  show(req) {
    const options = {
      ...Controller._getDefaultShowOptions(req),
      distinct: true,
      include: [
        {
          model: this.models.Reminder,
          required: false,
          where: { deleted: false }
        }
      ]
    }
    if (req.query.CreatorId && req.user.role !== Roles.ADMIN) {
      throw new HttpError('CreatorId parameter can be provided only by Admin')
    }
    if (req.user.role !== Roles.ADMIN) {
      options.where.CreatorId = req.user.id
    }
    if (req.query.search) {
      const search = req.query.search.trim()
      options.where.$or = [
        { header: this.models.MainHelper.likeLower(search, 'header') },
        { text: this.models.MainHelper.likeLower(search, 'text') }
      ]
    }
    return this.models.Note.findAndCountAll(options)
  }

  async create(req) {
    const note = await this.services.dao.note.create({ ...req.body, CreatorId: req.user.id })
    return { result: 'success', note }
  }

  async update(req) {
    let note = await this.models.Note.findByPk(req.params.id)

    if (!note) throw new HttpError(400, 'Not found note')
    if (req.user.role !== Roles.ADMIN && note.CreatorId !== req.user.id)
      throw new HttpError(403, 'You don\'t have permissions for update this note')

    note = await this.services.dao.note.update(note, { ...req.body, CreatorId: req.user.id })
    return { result: 'success', note }
  }
}

module.exports = Note