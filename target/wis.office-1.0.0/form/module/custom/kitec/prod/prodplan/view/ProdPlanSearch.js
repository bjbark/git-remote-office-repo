Ext.define('module.custom.kitec.prod.prodplan.view.ProdPlanSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prodplan-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.addonSearch()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype	: 'searchfield'	,
								flex	: 4				,
								emptyText: '',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								clearable	: false,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								hidden		: false,
								listeners	: {
									change : function(value){
										var val = value.getValue(),
											date = Ext.Date.format(new Date(), 'Y-m-d'),
											search = Ext.ComponentQuery.query('module-prodplan-search')[0],
											after
										;
										if(val == null){
											value.setValue(new Date());
										}else{
											after = Ext.Date.add(val,Ext.Date.DAY, +30)
											search.down('[name=invc_date2]').setValue(after);
										}
									}
								}
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								clearable	: false,
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add(new Date(),Ext.Date.DAY, +30),
								hidden		: false,
								listeners	: {
									change : function(value){
										var val = value.getValue(),
											date = Ext.Date.format(new Date(), 'Y-m-d'),
											search = Ext.ComponentQuery.query('module-prodplan-search')[0],
											before
										;
										if(val == null){
											value.setValue(Ext.Date.add(new Date(),Ext.Date.DAY, +30));
										}else{
											before = Ext.Date.add(val,Ext.Date.DAY, -30)
											search.down('[name=invc_date1]').setValue(before);
										}
									}
								}
							},{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date3',
								pair		: 'invc_date4',
								root		: true,
								clearable	: true,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								hidden		: true,
								listeners	: {
									render : function(value){
										var search = Ext.ComponentQuery.query('module-prodplan-search')[0],
											val = search.down('[name=invc_date1]').getValue()
										;
										value.setValue(val);
									}
								}
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date4',
								pair		: 'invc_date3',
								clearable	: true,
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								hidden		: true,
								listeners	: {
									render : function(value){
										var search = Ext.ComponentQuery.query('module-prodplan-search')[0],
											val = search.down('[name=invc_date2]').getValue()
										;
										value.setValue(val);
									}
								}
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_stat' )),
								value		: '',
								width		: 198
							}
						]
					}
				]
			};
		return line;
	}
});