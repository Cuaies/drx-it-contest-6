import { StagesEnum } from '../../ts/enums';

/**
 * Mapper for every stage's description.
 */
export const StageDescriptions = {
  [StagesEnum.Concept]:
    'Faza de generare a ideilor si stabilirea viziunii pentru un nou produs.',
  [StagesEnum.Fezabilitate]:
    'Analiza viabilitatii tehnice, economice si comerciale a produsului propus.',
  [StagesEnum.Proiectare]:
    'Crearea detaliilor tehnice si a specificatiilor pentru dezvoltarea produsului.',
  [StagesEnum.Productie]:
    'Fabricatia efectiva a produsului conform specificatiilor stabilite.',
  [StagesEnum.Retragere]:
    'Scoaterea treptata a produsului de pe piata la finalul ciclului sau de viata.',
  [StagesEnum.StandBy]:
    'Suspendarea temporara a produsului, fara retragere definitive.',
  [StagesEnum.Cancel]:
    'Anularea complete a dezvoltarii sau fabricarii produsului.',
};
