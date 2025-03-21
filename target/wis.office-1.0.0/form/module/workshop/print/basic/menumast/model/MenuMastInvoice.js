Ext.define( 'module.workshop.print.basic.menumast.model.MenuMastInvoice', {
	extend		: 'module.workshop.print.basic.menumast.model.MenuMastMaster',
	associations: [{
		type	: 'hasMany',
		model	: 'module.workshop.print.basic.menumast.model.MenuMastDetail',
		associationKey: 'product',
		name	: 'product'
	}]
});
