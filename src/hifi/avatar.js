import { AvatarGlobalPosition, AvatarOrientation } from './packets.js';
export class HifiAvatar {
  constructor(uuid=null) {
    this.uuid = uuid;
    this.displayName = 'unknown';
    this.position = new THREE.Vector3();
    this.orientation = new THREE.Quaternion();
    this.clearUpdates();
    this.sequenceId = 0;

    this.janusobj = room.createObject('object', { });
    this.body = this.janusobj.createObject('object', {
      id: 'sphere',
      col: 'red'
    });
    this.label = this.janusobj.createObject('text', {
      text: this.displayName,
      pos: V(0, 1.2, 0),
      font_scale: false,
      font_size: .1
    });
  }
  setPosition(pos) {
    this.position.copy(pos);
    this.janusobj.pos = this.position;
    this.hasUpdates = true;
  }
  setOrientation(orientation) {
    this.orientation.copy(orientation);
    this.janusobj.orientation.copy(this.orientation);
    this.hasUpdates = true;
  }
  clearUpdates() {
    this.hasUpdates = false;
  }
  setDisplayName(displayName) {
    this.displayName = displayName;
console.log(this.janusobj, displayName);
    if (displayName) {
      this.label.text = displayName;
    }
  }
  sendIdentityPacket(node) {
    // Send AvatarIdentity https://github.com/highfidelity/hifi/blob/db87fe96962fe63c847507ead32a11dad2f0f6ae/libraries/avatars/src/AvatarData.cpp#L1973-L1989
    let pack = node.createPacket('AvatarIdentity');
    pack.payload.avatarSessionUUID = this.uuid;
    pack.flags.reliable = true;
    pack.payload.displayName = this.displayName
    node.sendPacket(pack);
  }
  processAvatarIdentity(identity) {
    if (this.displayname != identity.displayName) {
      this.setDisplayName(identity.displayName);
    }
    console.log('processed identity packet', this.displayName, identity, this);
  }
  processAvatarData(avatarData) {
    //console.log('yup, got some updates', avatarData, this);
    avatarData.updates.forEach(update => {
      if (update instanceof AvatarGlobalPosition) {
        this.position.set(update.globalPositionX, update.globalPositionY, update.globalPositionZ);
        this.janusobj.pos = this.position;
console.log(' - new avatar pos', this.position, update, avatarData, this);
      }
      if (update instanceof AvatarOrientation) {
console.log(' - new avatar orientation', update);
      }
    });
  }
  processKillAvatar(killAvatar, sendingNode) {
    console.log('kill me!', killAvatar);
    this.janusobj.die();
  }
}
