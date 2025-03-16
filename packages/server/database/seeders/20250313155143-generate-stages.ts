'use strict';

import { Stage } from '../../src/app/modules/stages/models/stage.model';
import { StagesEnum } from '../../src/ts/enums';

module.exports = {
  // TODO: test seeder
  up: () => {
    Object.values(StagesEnum).map(async (name) => {
      await Stage.create({ name });
    });
  },

  down: async () => {
    await Stage.destroy();
  },
};
