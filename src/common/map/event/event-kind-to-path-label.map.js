import {EventKind, EventPathLabel} from '~/common/enums';

const eventKindToPathLabelMap = {
  [EventKind.TRANSFER]: EventPathLabel.TO,
  [EventKind.ACTIVITY]: EventPathLabel.IN,
};

export {eventKindToPathLabelMap};
