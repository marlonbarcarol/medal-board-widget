import SortableColumnEnum from 'Components/SortableColumn/SortableColumnEnum';
import MedalWidget from 'MedalWidget';

window.MedalWidget = MedalWidget; 

const instance = new MedalWidget(SortableColumnEnum.SILVER, document.querySelector('div'));
instance.initialize();

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept();
}