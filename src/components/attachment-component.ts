import { Attachment } from '../lib/attachments/attachment';

export class AttachmentComponent implements Phecs.Component {
  public attachments: Attachment[];

  private scene: Phaser.Scene;
  private data: Phecs.EntityData;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.scene = scene;
    this.data = data;

    this.attachments = [];
  }

  createAttachment(type: string, config: Attachments.ShapeConfig, debugColor?: number): Attachment {
    const attachment = new Attachment(type, config, debugColor, this.scene);
    this.attachments.push(attachment);

    return attachment;
  }

  getAttachmentsByType(type: string): Attachment[] {
    return this.attachments.filter(attachment => attachment.type === type);
  }

  destroy() {
    this.attachments.forEach(attachment => attachment.destroy());

    delete this.attachments;
    delete this.getAttachmentsByType;
    delete this.createAttachment;
  }
}
