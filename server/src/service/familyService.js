const MissingPerson = require("../models/missingPersone").MissingPerson;

class MissingPersonService {
  static async createMissingPerson(owner, body) {
    try {
      const { note,image, ...other } = body;
      const data = {
        owner,
        ...other,
        notes: [
          {
            sender: owner,
            body: note,
            image: image || null,
          },
        ],
      };

      const missingPerson = await MissingPerson.create(data);

      return missingPerson;
    } catch (error) {
      throw new Error("Error creating missing person report");
    }
  }

  static async updateMissingPerson(id, userId, body) {
    const missingPerson = await MissingPerson.findById(id);

    if (!missingPerson) {
      throw new Error("Missing person report not found");
    }

    const isOwner = missingPerson.owner.toString() === userId.toString();

    if (!isOwner && body.status) {
      throw new Error("Only the owner can change status");
    }

    let updateData = {};

    if (isOwner && body.status) {
      updateData.status = body.status;
    }
    if (body.note || body.image) {
      updateData.$push = {
        notes: {
          sender: userId,
          body: body.note || "",
          image: body.image || null,
          createdAt: new Date(),
        },
      };
    }
    let finalUpdate = {};

    if (updateData.status) {
      finalUpdate.$set = { status: updateData.status };
    }

    if (updateData.$push) {
      finalUpdate.$push = updateData.$push;
    }

    const updatedMissingPerson = await MissingPerson.findByIdAndUpdate(
      id,
      finalUpdate,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("owner", "full_name profile_url")
      .populate("notes.sender", "full_name profile_url");

    return updatedMissingPerson;
  }

  static async getMissingPersonById(Id) {
    const missingPerson = await MissingPerson.findById(Id);
    if (!missingPerson) {
      throw new Error(" Can't find family service by id");
    }
    return missingPerson;
  }

  static async getAllMissingPersons() {
    const AllMissingPersons = await MissingPerson.find()
      .populate("owner", "full_name profile_url")
      .populate("notes.sender", "full_name profile_url");

    if (!AllMissingPersons) {
      throw new Error(" Can't return all family services");
    }

    return AllMissingPersons;
  }
}

module.exports = MissingPersonService;
