import { EntityManager } from '../lib/phecs/entity-manager';
import { BaseScene } from '../scenes/base-scene';

export class AdventurerDeathSystem implements Phecs.System {
  private scene: BaseScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
  }

  start(phEntities: EntityManager) {
    this.scene.persistence.onChange<number>('adventurer.health', health => {
      if (health <= 0) {
        this.scene.scene.stop('hud');
        this.scene.scene.pause('exploration');
        this.scene.scene.launch('death', {
          respawnAreaKey: this.scene.areaManager.currentAreaKey,
        });
      }
    });
  }
}