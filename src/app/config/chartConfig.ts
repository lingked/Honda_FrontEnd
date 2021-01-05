export class basicLineChartOption {
  public backgoundColor;
  public responsive;
  public animation;
  public elements;
  public scales;

  constructor() {
    this.backgoundColor = ['dark'];
    this.responsive = true;
    this.animation = false;
    this.elements = {
      line: {
        tension: 0,
        fill: false,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'red',
      },
    };
    this.scales = {
      xAxes: [
        {
          display: true,
          ticks: {
            type: 'time',
            time: {
              unit: 'minute',
            },
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            steps: 10,
            stepValue: 0.1,
            max: 1,
            min: -1,
          },
        },
      ],
    };
  }
}
