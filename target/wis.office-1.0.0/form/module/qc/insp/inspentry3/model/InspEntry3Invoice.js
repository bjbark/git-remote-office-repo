Ext.define( 'module.qc.insp.inspentry3.model.InspEntry3Invoice', {
	extend: 'module.qc.insp.inspentry3.model.InspEntry3Master',
	associations: [{
		type: 'hasMany',
		model: 'module.qc.insp.inspentry3.model.InspEntry3Detail',
		associationKey: 'product',
		name: 'product'
	}]
});
