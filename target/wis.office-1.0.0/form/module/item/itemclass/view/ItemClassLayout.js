Ext.define('module.item.itemclass.view.ItemClassLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemclass-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-itemclass-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('itm_clss_list','품목 분류 현황'),
						layout	: { type: 'hbox', align: 'stretch' },
						border	: 0,
						items	: [
							{xtype	: 'module-itemclass-lister-cate1'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.right } ,
							{xtype	: 'module-itemclass-lister-cate2'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.left    + Const.borderLine.right  } ,
							{xtype	: 'module-itemclass-lister-cate3'	, flex : 2.5	, margin : '0 1 0 0'	, style : Const.borderLine.left    + Const.borderLine.right  } ,
							{xtype	: 'module-itemclass-lister-cate4'	, flex : 2.5							, style : Const.borderLine.left    , hidden : (_global.item_class < 4) }
						]
					},{
						title	: Language.get('itm_clss_info','품목 분류 정보'),
						hidden	: Boolean(_global.stor_grp != '1'),
						layout	: { type: 'hbox', align: 'stretch' },
						border	: 0,
						items	: [
							{xtype : 'module-itemclass-lister-excel', flex : 1    }
						]
					}

				]
			},{
				xtype : 'module-itemclass-editor', region : 'south' , hidden : Boolean(_global.stor_grp != _global.stor_id)
			}
		];
		me.callParent(arguments);
	}
});
