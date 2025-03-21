Ext.define( 'module.custom.hantop.sale.estientry2.model.EstiEntry2Invoice', {
	extend : 'module.custom.hantop.sale.estientry2.model.EstiEntry2Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail',
		associationKey : 'product',
		name : 'product'
	}]
});
