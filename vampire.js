class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampTreeClimb = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      vampTreeClimb++;
    }
    return vampTreeClimb;
  }

  // Returns true if this vampire is more senior than the other vampire.
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /* Stretch */

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get lineage() {
    const lineage = [];
    let currentVamp = this;
    lineage.push(currentVamp);
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      lineage.push(currentVamp);
    }
    return lineage;
  }

  // Not working yet
  closestCommonAncestor(vampire) {
    const lineageOne = this.lineage;
    const lineageTwo = vampire.lineage;
    for (const ancestor of lineageOne) {
      if (ancestor.name === vampire.name) {
        return vampire;
      }
    }
    for (const ancestor of lineageTwo) {
      if (ancestor.name === this.name) {
        return this;
      }
    }
    for (const ancestor of lineageOne) {
      for (const relative of lineageTwo) {
        if (ancestor.name === relative.name) {
          return ancestor;
        }
      }
    }
  }
}

module.exports = Vampire;
