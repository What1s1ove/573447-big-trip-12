import Abstract from '~/view/abstract/abstract';
import {
  initMoneyChart,
  initTransportChart,
  initTimeSpendChart,
} from './helpers';

class Statistics extends Abstract {
  constructor({events}) {
    super();
    this._events = events;

    this._moneyCart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this.setCharts();
  }

  get template() {
    return `
      <section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>
    `;
  }

  removeElement() {
    super.removeElement();

    this._resetCharts();
  }

  setCharts() {
    const moneyStatsNode = this.node.querySelector(`.statistics__chart--money`);
    const transportStatsNode = this.node.querySelector(`.statistics__chart--transport`);
    const timeSpendStatsNode = this.node.querySelector(`.statistics__chart--time`);

    this._moneyCart = initMoneyChart(moneyStatsNode, this._events);
    this._transportChart = initTransportChart(transportStatsNode, this._events);
    this._timeSpendChart = initTimeSpendChart(timeSpendStatsNode, this._events);
  }

  _resetCharts() {
    if (this._moneyCart || this._transportChart || this._timeSpendChart) {
      this._moneyCart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
  }
}

export default Statistics;
