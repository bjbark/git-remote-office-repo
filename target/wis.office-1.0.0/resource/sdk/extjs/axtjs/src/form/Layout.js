Ext.define('Axt.form.Layout', { extend: 'Ext.panel.Panel',
	layout: 'border',
	alias: 'widget.form-layout',
    style: 'padding-top : 2;padding-bottom : 2;padding-left : 2;padding-right : 2;',
	cls	 : 'layout-back',

	requires: [
	 	'Axt.tab.Panel'  ,
	 	'Axt.grid.Panel' ,
	 	'Axt.form.Panel'
	]

});
