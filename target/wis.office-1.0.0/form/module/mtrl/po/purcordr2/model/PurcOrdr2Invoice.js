Ext.define( 'module.mtrl.po.purcordr2.model.PurcOrdr2Invoice', {
	extend: 'module.mtrl.po.purcordr2.model.PurcOrdr2Master',
	associations: [{
		type: 'hasMany',
		model: 'module.mtrl.po.purcordr2.model.PurcOrdr2Detail',
		associationKey: 'product',
		name: 'product'
	}]
});
