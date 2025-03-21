Ext.define( 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Invoice', {
	extend: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Master',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Detail',
		associationKey: 'product',
		name: 'product'
	}]
});
