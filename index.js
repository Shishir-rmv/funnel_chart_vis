module.exports = function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/funnel_chart_vis/funnel_chart_vis'
            ]
        }
    });
};