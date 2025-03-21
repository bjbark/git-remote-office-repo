Ext.define('module.basic.clssmast.view.ClssMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-clssmast-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-clssmast-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('','거래처 분류 현황'),
						layout	: { type: 'hbox', align: 'stretch' },
						border	: 0,
						items	: [
							{xtype	: 'module-clssmast-lister-cate1'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.right } ,
							{xtype	: 'module-clssmast-lister-cate2'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.left    + Const.borderLine.right  } ,
							{xtype	: 'module-clssmast-lister-cate3'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.left    + Const.borderLine.right  } ,
							{xtype	: 'module-clssmast-lister-cate4'	, flex : 2.5							, style : Const.borderLine.left    , hidden : (_global.item_class < 4) }
						]
					},{
						title	: Language.get('','거래처 분류 현황'),
						hidden	: Boolean(_global.stor_grp != '1'),
						layout	: { type: 'hbox', align: 'stretch' },
						border	: 0,
//						items	: [
//							{xtype : 'module-clssmast-lister-excel', flex : 1    }
//						]
					}

				]
			},{
				xtype : 'module-clssmast-editor', region : 'south' , hidden : Boolean(_global.stor_grp != _global.stor_id)
			}
		];
		me.callParent(arguments);
	}
});
