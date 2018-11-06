import * as struct from '../utils/struct.js';
import { Enum } from '../utils/enum.js';
import { Flags } from '../utils/flags.js';

const PacketType = new Enum([
  'Unknown',
  'StunResponse',
  'DomainList',
  'Ping',
  'PingReply',
  'KillAvatar',
  'AvatarData',
  'InjectAudio',
  'MixedAudio',
  'MicrophoneAudioNoEcho',
  'MicrophoneAudioWithEcho',
  'BulkAvatarData',
  'SilentAudioFrame',
  'DomainListRequest',
  'RequestAssignment',
  'CreateAssignment',
  'DomainConnectionDenied',
  'MuteEnvironment',
  'AudioStreamStats',
  'DomainServerPathQuery',
  'DomainServerPathResponse',
  'DomainServerAddedNode',
  'ICEServerPeerInformation',
  'ICEServerQuery',
  'OctreeStats',
  'UNUSED_PACKET_TYPE_1',
  'AvatarIdentityRequest',
  'AssignmentClientStatus',
  'NoisyMute',
  'AvatarIdentity',
  'NodeIgnoreRequest',
  'DomainConnectRequest',
  'DomainServerRequireDTLS',
  'NodeJsonStats',
  'OctreeDataNack',
  'StopNode',
  'AudioEnvironment',
  'EntityEditNack',
  'ICEServerHeartbeat',
  'ICEPing',
  'ICEPingReply',
  'EntityData',
  'EntityQuery',
  'EntityAdd',
  'EntityErase',
  'EntityEdit',
  'DomainServerConnectionToken',
  'DomainSettingsRequest',
  'DomainSettings',
  'AssetGet',
  'AssetGetReply',
  'AssetUpload',
  'AssetUploadReply',
  'AssetGetInfo',
  'AssetGetInfoReply',
  'DomainDisconnectRequest',
  'DomainServerRemovedNode',
  'MessagesData',
  'MessagesSubscribe',
  'MessagesUnsubscribe',
  'ICEServerHeartbeatDenied',
  'AssetMappingOperation',
  'AssetMappingOperationReply',
  'ICEServerHeartbeatACK',
  'NegotiateAudioFormat',
  'SelectedAudioFormat',
  'MoreEntityShapes',
  'NodeKickRequest',
  'NodeMuteRequest',
  'RadiusIgnoreRequest',
  'UsernameFromIDRequest',
  'UsernameFromIDReply',
  'AvatarQuery',
  'RequestsDomainListData',
  'PerAvatarGainSet',
  'EntityScriptGetStatus',
  'EntityScriptGetStatusReply',
  'ReloadEntityServerScript',
  'EntityPhysics',
  'EntityServerScriptLog',
  'AdjustAvatarSorting',
  'OctreeFileReplacement',
  'CollisionEventChanges',
  'ReplicatedMicrophoneAudioNoEcho',
  'ReplicatedMicrophoneAudioWithEcho',
  'ReplicatedInjectAudio',
  'ReplicatedSilentAudioFrame',
  'ReplicatedAvatarIdentity',
  'ReplicatedKillAvatar',
  'ReplicatedBulkAvatarData',
  'DomainContentReplacementFromUrl',
  'ChallengeOwnership',
  'EntityScriptCallMethod',
  'ChallengeOwnershipRequest',
  'ChallengeOwnershipReply',

  'OctreeDataFileRequest',
  'OctreeDataFileReply',
  'OctreeDataPersist',

  'EntityClone',
  'EntityQueryInitialResultsComplete',

  'NUM_PACKET_TYPE'
]);

const NonVerifiedPackets = [
  PacketType.NodeJsonStats,
  PacketType.EntityQuery,
  PacketType.OctreeDataNack,
  PacketType.EntityEditNack,
  PacketType.DomainListRequest,
  PacketType.StopNode,
  PacketType.DomainDisconnectRequest,
  PacketType.UsernameFromIDRequest,
  PacketType.NodeKickRequest,
  PacketType.NodeMuteRequest,
];
const NonSourcedPackets = [
  PacketType.StunResponse,
  PacketType.CreateAssignment,
  PacketType.RequestAssignment,
  PacketType.DomainServerRequireDTLS,
  PacketType.DomainConnectRequest,
  PacketType.DomainList,
  PacketType.DomainConnectionDenied,
  PacketType.DomainServerPathQuery,
  PacketType.DomainServerPathResponse,
  PacketType.DomainServerAddedNode,
  PacketType.DomainServerConnectionToken,
  PacketType.DomainSettingsRequest,
  PacketType.OctreeDataFileRequest,
  PacketType.OctreeDataFileReply,
  PacketType.OctreeDataPersist,
  PacketType.DomainContentReplacementFromUrl,
  PacketType.DomainSettings,
  PacketType.ICEServerPeerInformation,
  PacketType.ICEServerQuery,
  PacketType.ICEServerHeartbeat,
  PacketType.ICEServerHeartbeatACK,
  PacketType.ICEPing,
  PacketType.ICEPingReply,
  PacketType.ICEServerHeartbeatDenied,
  PacketType.AssignmentClientStatus,
  PacketType.StopNode,
  PacketType.DomainServerRemovedNode,
  PacketType.UsernameFromIDReply,
  PacketType.OctreeFileReplacement,
  PacketType.ReplicatedMicrophoneAudioNoEcho,
  PacketType.ReplicatedMicrophoneAudioWithEcho,
  PacketType.ReplicatedInjectAudio,
  PacketType.ReplicatedSilentAudioFrame,
  PacketType.ReplicatedAvatarIdentity,
  PacketType.ReplicatedKillAvatar,
  PacketType.ReplicatedBulkAvatarData,
];

    // Combined form of Packet and NLPacket
    //  - NLPacket:  https://github.com/highfidelity/hifi/blob/master/libraries/networking/src/NLPacket.h#L27-L40
    //  - Packet: https://github.com/highfidelity/hifi/blob/master/libraries/networking/src/udt/Packet.h#L29-L44
    //                         Packet Header Format
    //
    //     0                   1                   2                   3
    //     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //    |C|R|M| O |               Sequence Number                       |
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //    | P |                     Message Number                        |  Optional (only if M = 1)
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //    |                         Message Part Number                   |  Optional (only if M = 1)
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //    |  Packet Type  |    Version    | Local Node ID - sourced only  |
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //    |                                                               |
    //    |                 MD5 Verification - 16 bytes                   |
    //    |                 (ONLY FOR VERIFIED PACKETS)                   |
    //    |                                                               |
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    //
    //    C: Control bit
    //    R: Reliable bit
    //    M: Message bit
    //    O: Obfuscation level
    //    P: Position bits
    //    NLPacket format:

class NLPacket extends struct.define({
  sequenceNumberAndBitfield: new struct.Uint32_t,
  //messageHeader: new struct.Struct_t, // optional, only if message header is set
  packetType: new struct.Uint8_t,
  version: new struct.Uint8_t,
  localNodeID: new struct.Uint16_t,
  hmac: new struct.Hex128_t,
  //payload: new struct.Struct_t
}) {
  constructor(args) {
    super(args);

    this.flags = {
      control: false,
      reliable: false,
      message: false
    };

    if (args && args.packetType) {
      this.packetTypeClass = PacketTypeDefs[args.packetType];
      this.packetType = PacketType[args.packetType];
      this.packetName = args.packetType;
    }
  }
  get headerLength() {
    return NLPacket.totalHeaderSize(this.packetType, this.flags.message); //super.size();
  }
  get byteLength() {
    return this.headerLength + (this.payload ? this.payload.size() : 0);
  }
  setPayload(payload) {
    this.payload = payload;
  }
  write(data, offset) {
    if (!data) {
      data = new ArrayBuffer(this.headerLength + this.payload.size());
      offset = 0;
    }
    this.sequenceNumberAndBitfield =
      this.flags.control << 31 |
      this.flags.reliable << 30 |
      this.flags.message << 29 |
      this.flags.obfuscationlevel << 27 |
      this.sequenceNumber;

    let fin = super.write(data, offset);
    if (this.payload) {
      this.payload.write(fin, this.headerLength);
    }
    return fin;
  }
  read(data, offset=0) {
    //super.read(data, offset);
    let buf = (data instanceof DataView ? new DataView(data.buffer, offset + data.byteOffset) : new DataView(data, offset));
    this.sequenceNumberAndBitfield = buf.getUint32(0);
    let headerOffset = 4;

    this.sequenceNumber = this.sequenceNumberAndBitfield & 0x07FFFFFF;
    this.flags = {
      control: this.sequenceNumberAndBitfield >>> 31 & 1,
      reliable: this.sequenceNumberAndBitfield >>> 30 & 1,
      message: this.sequenceNumberAndBitfield >>> 29 & 1,
    };
    this.obfuscationlevel = this.sequenceNumberAndBitfield >>> 27 & 3;

    if (this.flags.reliable) {
      //console.log('got a reliable packet', this);
    }
    if (this.flags.message) {
      //console.log('got a message packet', this);
      this.messageNumber = buf.getUint32(headerOffset);
      this.messagePartNumber = buf.getUint32(headerOffset + 4);
      headerOffset += 8;
    }

    this.packetType = buf.getUint8(headerOffset);
    this.version = buf.getUint8(headerOffset + 1);
    this.localNodeID = buf.getUint16(headerOffset + 1);

    //hmac: new struct.Hex128_t,
    // FIXME - need to read HMAC string for packet verification

    if (!isNaN(this.packetType) && isFinite(this.packetType)) {
      let packetType = PacketType.fromValue(this.packetType);

      this.packetTypeClass = PacketTypeDefs[packetType];
      this.packetName = packetType;
      if (this.packetTypeClass) {
        this.setPayload(new this.packetTypeClass());
        let payloadOffset = NLPacket.totalHeaderSize(this.packetType, this.flags.message);
        let payloaddata = new Uint8Array(data, offset + payloadOffset, data.byteLength - offset - payloadOffset);//, this.payload.size());
        //this.payload.read(data, offset + NLPacket.totalHeaderSize(this.packetType, this.flags.message));
        this.payload.read(payloaddata.buffer, payloaddata.byteOffset);

        // Debug code - store a reference to the original underlying data so we can refer back to it to make sure the values are correct later
        //console.log('Packet serialization comparison:', payloaddata, new Uint8Array(this.payload.write()));
        this.payload.rawdata = payloaddata;
      }
    }
  }
  static totalHeaderSize(packetType, isMessage) {
    return 4 + // sizeof(this.sequenceNumberAndBitfield)
           (isMessage ? 8 : 0) + // sizeof(messageNumber) + szeof(messagePartNumber), optional
           NLPacket.localHeaderSize(packetType); // sourceID + verification hash, optional
  }
  static localHeaderSize(packetType) {
    let nonSourced = NonSourcedPackets.indexOf(packetType) != -1,
        nonVerified = NonVerifiedPackets.indexOf(packetType) != -1;
    const NUM_BYTES_LOCALID = 2;
    const NUM_BYTES_MD5_HASH = 16;
    // sizeof(packetType) + sizeof(packetVersion) + extras
    let optionalSize = 2 + (nonSourced ? 0 : NUM_BYTES_LOCALID) + ((nonSourced || nonVerified) ? 0 : NUM_BYTES_MD5_HASH);
//console.log('OPTSIZE', optionalSize, nonSourced, nonVerified, this.packetType, NonVerifiedPackets);
    
    return optionalSize; 
  }
  static fromReceivedPacket(data) {
    let nlpacket = new NLPacket();
    nlpacket.read(data);
    return nlpacket;
  }
  verify(hmac) {
    //let data = this.payload.rawdata; //this.payload.write();
    let computedhash = hmac.calculateHash(new Uint8Array(this.payload.getData()));
    //console.log(this.packetName, this.hmac, computedhash, hmac.calculateHash(new Uint8Array(this.payload.write())), this);
    return computedhash == this.hmac;
  }
  writeVerificationHash(hmac) {
    let newhash = hmac.calculateHash(new Uint8Array(this.payload.getData()));
    this.hmac = newhash;
    return newhash;
  }
  isReliable() {
    return this.flags.reliable;
  }
};

class QHostAddress extends struct.define({
  protocol: new struct.Int8_t,
  addr: new struct.Uint32_t,
}) { };
class HifiAddress extends struct.define({
  address: QHostAddress,
  port: new struct.Uint16_t
}) { };

class Ping extends struct.define({
  pingType: new struct.Uint8_t,
  time: new struct.Uint64_t,
  connectionid: new struct.Int64_t
}) { };

class PingReply extends struct.define({
  pingType: new struct.Uint8_t,
  pingTime: new struct.Uint64_t,
  time: new struct.Uint64_t
}) { };
class SelectedAudioFormat extends struct.define({
  codec: new struct.String_t,
}) { };
class Node extends struct.define({
  nodeType: new struct.Char_t,
  uuid: new struct.UUID_t,
  // FIXME - this should be a HifiAddress/QHostAddress, which supports ipv4 and ipv6 addresses
  nodePublicAddressType: new struct.Int8_t,
  nodePublicAddress: new struct.Uint32BE_t,
  nodePublicPort: new struct.Uint16BE_t,
  // FIXME - this should also be a HifiAddress/QHostAddress
  nodeLocalAddressType: new struct.Int8_t,
  nodeLocalAddress: new struct.Uint32BE_t,
  nodeLocalPort: new struct.Uint16BE_t,
  permissions: new struct.Uint32BE_t,
  replicated: new struct.Boolean_t,
  sessionLocalID: new struct.Uint16BE_t,
  connectionSecretUUID: new struct.UUID_t,
}) { };
class DomainList extends struct.define({
  domainUUID: new struct.UUID_t,
  domainLocalID: new struct.Uint16_t,
  sessionUUID: new struct.UUID_t,
  localID: new struct.Uint16_t,
  permissions: new struct.Uint32_t,
  authenticated: new struct.Boolean_t,
  nodes: new struct.StructList_t()
}) { 
  read(data, offset) {
    let d = super.read(data, offset);
    if (!offset) offset = 0;
//console.log('READ DOMAINLIST', d, data, offset, this);

    let buf = (data instanceof DataView ? new DataView(data.buffer, offset + data.byteOffset) : new DataView(data, offset));

    let payloadOffset = 41,
        payloadLength = buf.byteLength - payloadOffset;

//console.log('!!', this.size(), buf.byteLength, offset, payloadOffset, payloadLength);
    let idx = payloadOffset;
    this.nodes = [];
    while (idx < data.byteLength - 24) { // FIXME - not sure where the extra 24 bytes are coming from
      let node = new Node().read(data, idx + offset);
      //console.log(' - read node:', node, node.size(), idx, data.byteLength);
      this.nodes.push(node);
      idx += node.size();
    }
    return d;
  }
};

const AvatarDataHasFlags = new Flags([
  'avatar_global_position',
  'avatar_bounding_box',
  'avatar_orientation',
  'avatar_scale',
  'look_at_position',
  'audio_loudness',
  'sensor_to_world_matrix',
  'additional_flags',
  'parent_info',
  'avatar_local_position',
  'face_tracker_info',
  'joint_data',
  'joint_default_pose_flags',
  'grab_joints'
]);

class AvatarData extends struct.define({
  sequenceId: new struct.Uint16_t,
  hasFlags: new struct.Uint16_t,
  updates: new struct.StructList_t
}) {
  updateFromAvatar(avatar) {
    this.updates = [];
    this.sequenceId = avatar.sequenceId++;

    let hasFlags = 0;
    let sendPosition = true,
        sendOrientation = true;
    if (sendPosition) {
      hasFlags |= AvatarDataHasFlags.avatar_global_position;
      let globalpos = new AvatarGlobalPosition();
      globalpos.globalPositionX = avatar.position.x;
      globalpos.globalPositionY = avatar.position.y;
      globalpos.globalPositionZ = avatar.position.z;
      this.updates.push(globalpos);
    }
  }  
};

class AvatarGlobalPosition extends struct.define({
  globalPositionX: new struct.Float_t,
  globalPositionY: new struct.Float_t,
  globalPositionZ: new struct.Float_t
}) { };

var PacketTypeDefs = {
  NLPacket: NLPacket,
  Ping: Ping,
  PingReply: PingReply,
  SelectedAudioFormat: SelectedAudioFormat,
  DomainList: DomainList,
  AvatarData: AvatarData,
};

export {
  PacketType,

  NLPacket,
  Ping,
  PingReply,
  SelectedAudioFormat,
  DomainList,
  AvatarDataHasFlags,
  AvatarData,
  AvatarGlobalPosition
};
