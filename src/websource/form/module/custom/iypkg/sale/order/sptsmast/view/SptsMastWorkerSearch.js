Ext.define('module.custom.iypkg.sale.order.sptsmast.view.SptsMastWorkerSearch', { extend: 'Axt.form.Search',

	store	: 'module.custom.iypkg.sale.order.sptsmast.store.SptsMastWorker',
	alias	: 'widget.module-sptsmast-worker-search',
	height	: 132,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 300, labelWidth : 40 , margin : '5 0 5 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
					items : [
						{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0,
							items : [
								{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
									items : [
										{	xtype : 'fieldset', layout: 'hbox', margin : '3 0 0 0', border : 0,
											items : [
												{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
													xtype		: 'popupfield',
													name		: 'acpt_numb',
													editable	: true,
													enableKeyEvents : true,
													clearable	: true ,
													labelWidth	: 50,
													width		: 265,
													popup		: {
														widget	: 'lookup-iypkg-ordr-popup',
														select	: 'SINGLE',
														params	: { stor_grp : _global.stor_grp, line_stat : '0' },
														result	: function(records, nameField, pairField ) {
															nameField.setValue(records[0].get('invc_numb'));
														}
													}
												},{	fieldLabel	: Language.get('cstm','거래처'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													name		: 'cstm_name',
													pair		: 'cstm_idcd',
													labelWidth	: 50,
													width		: 265,
													margin		: '5 0 0 30',
													clearable	: true,
													popup		: {
														select	: 'SINGLE',
														widget	: 'lookup-cstm-popup',
														params	: { stor_grp : _global.stor_grp , line_stat : '0' },
														result	: function(records, nameField, pairField) {
															nameField.setValue(records[0].get('cstm_name'));
															pairField.setValue(records[0].get('cstm_idcd'));
														}
													}
												},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
												}
											]
										},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0,
											items : [
												{	fieldLabel	: Language.get('item','품목코드'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													name		: 'item_name',
													labelWidth	: 50,
													width		: 265,
													margin		: '0 0 0 0',
													pair		: 'item_idcd',
													clearable	: true,
													popup		: {
														select	: 'SINGLE',
														widget	: 'lookup-prod-popup',
														params	: { stor_grp : _global.stor_grp , line_stat : '0' },
														result	: function(records, nameField, pairField) {
															nameField.setValue(records[0].get('prod_name'));
															pairField.setValue(records[0].get('prod_idcd'));
														}
													}
												},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
												},{	fieldLabel	: Language.get('drtr_name','영업담당'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													name		: 'user_name',
													pair		: 'user_idcd',
													labelWidth	: 50,
													width		: 265,
													margin		: '0 0 0 30',
													clearable	: true,
													popup		: {
														select	: 'SINGLE',
														widget	: 'lookup-user-popup',
														params	: { stor_grp : _global.stor_grp , line_stat : '0' },
														result	: function(records, nameField, pairField) {
															nameField.setValue(records[0].get('user_name'));
															pairField.setValue(records[0].get('user_idcd'));
														}
													}
												},{	name		: 'user_idcd', xtype : 'textfield' , hidden : true
												}
											]
										},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0,
											items : [
												{	fieldLabel	: Language.get('','수주일자'),
													xtype		: 'betweenfield',
													name		: 'acpt_date1',
													pair		: 'acpt_date2',
													labelWidth	: 50,
													width		: 150,
													root		: true,
													value		: ''
												},{	fieldLabel	: Language.get('','~'),
													xtype		: 'betweenfield',
													name		: 'acpt_date2',
													pair		: 'acpt_date1',
													labelWidth	: 15,
													width		: 115,
													value		: ''
												},{	fieldLabel	: Language.get('','납기일자'),
													xtype		: 'betweenfield',
													name		: 'deli_date1',
													pair		: 'deli_date2',
													labelWidth	: 50,
													width		: 150,
													margin		: '5 0 0 30',
													root		: true,
													value		: Ext.Date.getFirstDateOfMonth(new Date())
												},{	fieldLabel	: Language.get('','~'),
													xtype		: 'betweenfield',
													name		: 'deli_date2',
													pair		: 'deli_date1',
													labelWidth	: 15,
													width		: 115,
													value		: new Date()
												}
											]
										}
									]
								},{	text		: '<span class="btnTemp" style="font-size:1.3em">출고대기 가져오기</span>',
									xtype		: 'button',
									width		: 160,
									height		: 70,
									margin		: '20 0 0 40',
									cls			: 'button-style',
									action		: 'selectAction2'
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', margin : '3 0 0 0', border : 0,
							items : [
								{	xtype		: 'label',
									text		: '출하계획일자',
									margin		: '3 0 0 10',
									style		: { color : 'Blue' },
									width		: 65,
								},{	xtype		: 'betweenfield',
									name		: 'plan_date',
									width		: 95,
									margin		: '0 0 0 0',
								},{	fieldLabel	: '출하계획번호',
									xtype		: 'textfield',
									name		: 'new_invc_numb',
									hidden		: true
								},{	fieldLabel	: Language.get('line_clos','상태'),
									xtype		: 'lookupfield',
									name		: 'line_clos',
									lookupValue	: resource.lookup('line_clos'),
									value		: '0',
									margin		: '0 0 0 145',
									labelWidth	: 50,
									width		: 150
								}
							]
						}
					]
				}
			]
		};
		return item;
	}
});
