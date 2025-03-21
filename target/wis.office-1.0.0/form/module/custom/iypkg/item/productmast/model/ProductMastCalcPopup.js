Ext.define( 'module.custom.iypkg.item.productmast.model.ProductMastCalcPopup', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'length'			, type: 'float '		/* 원단		*/, defaultValue : 0
		},{	name: 'divs'			, type: 'string '		/* 수량		*/, defaultValue : 0
		},{	name: 'deff'			, type: 'float '		/* 재단여분	*/, defaultValue : 0
		},{	name: 'result'			, type: 'string '		/* 스코어	*/
		}
	]
});
