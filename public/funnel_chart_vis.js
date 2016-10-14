define(function (require) {
// we need to load the css ourselves
 require('plugins/funnel_chart_vis/funnel_chart_vis.less');

  // we also need to load the controller and used by the template
 require('plugins/funnel_chart_vis/funnel_chart_vis_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(FunnelChartVisProvider);

  function FunnelChartVisProvider(Private) {
    const TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    const Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'funnel-chart',
      title: 'Funnel Chart',
      description: 'A Chart to represent stages in a sales process and show amount of potential revenue for each stage.',
      icon: 'fa-filter',
      template: require('plugins/funnel_chart_vis/funnel_chart_vis.html'),
      params: {
        defaults: {
          handleNoResults: true,
          fontSize: 60,
          invertScale: false
        },
        editor: require('plugins/funnel_chart_vis/funnel_chart_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Slice Size',
          min: 1,
          max: 1,
          aggFilter: ['sum', 'count', 'cardinality'],
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          icon: 'fa fa-scissors',
          title: 'Split Slices',
          min: 0,
          max: Infinity,
          aggFilter: '!geohash_grid'
        },
        {
          group: 'buckets',
          name: 'split',
          icon: 'fa fa-th',
          title: 'Split Chart',
          mustBeFirst: true,
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return FunnelChartVisProvider;
});