const MissingPerson = require('../models/missingPersone').MissingPerson;

class MissingPersonService {
    static async createMissingPerson
        (owner,body) {

        try {
            const data = {owner,...body};
            const missingPerson = await MissingPerson.create(data);

            return missingPerson;
        }
        catch (error) {
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
console.log(body);
    let updateData = {};

    if (isOwner && body.status) {
      updateData.status = body.status;
    }

    if (body.note || body.image) {
      updateData.$push = {
        notes: {
          sender: userId,
          body: body.note,
          image: body.image
        }
      };
    }

    const updatedMissingPerson = await MissingPerson.findByIdAndUpdate(
      id,
      updateData,
      {
        new:true,
        runValidators: true,
      }
    );
    return updatedMissingPerson;
  }

    static async getMissingPersonById(Id) {
        const missingPerson = await MissingPerson.findById(Id);
        if (!missingPerson) { throw new Error(" Can't find family service by id"); }
        return missingPerson;
    }




    static async getAllMissingPersons() {
        const AllMissingPersons = await MissingPerson.find();

        if (!AllMissingPersons) { throw new Error(" Can't return all family services"); }

        return AllMissingPersons;
    }

}

module.exports = MissingPersonService;