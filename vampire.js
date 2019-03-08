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

  // Returns closest common ancestor
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

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      let match = null;
      for (let i = 0; match === null && i < this.offspring.length; i++) {
        match = this.offspring[i].vampireWithName(name);
      }
      return match
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendentCount = 0;
    for (const vampire of this.offspring) {
      descendentCount++;
      descendentCount += vampire.totalDescendents;
    }
    return descendentCount;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    for (const vampire of this.offspring) {
      const millenialOffspring = vampire.allMillennialVampires;
      millenials = millenials.concat(millenialOffspring);
    }
    return millenials;
  }
}

module.exports = Vampire;
