Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-purcordr-worker-editor',
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 74,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
									{	fieldLabel	: Language.get('invc_date','수주일자'),
										xtype		: 'betweenfield',
										name		: 'invc_date1',
										pair		: 'invc_date2',
										clearable	: true,
										margin		: '5 5 5 -10',
										width		: 146,
										labelWidth	: 50,
										root		: true,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: Ext.Date.getFirstDateOfMonth(new Date())
									},{	fieldLabel	: Language.get('','~'),
										xtype		: 'betweenfield',
										name		: 'invc_date2',
										pair		: 'invc_date1',
										clearable	: true,
										width		: 101,
										labelWidth	: 5,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: new Date()
									},{	fieldLabel	: Language.get('fabc_name', '원단' ),
										name		: 'fabc_name',
										pair		: 'fabc_idcd',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										width		: 252,
										labelWidth	: 50,
										popup		: {
											widget	: 'lookup-fabc-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('fabc_name'));
												pairField.setValue(records[0].get('fabc_idcd'));
											}
										}
									},{	fieldLabel	: Language.get('boxx_acpt_numb', '수주번호' ),
										name		: 'invc_numb',
										xtype		: 'searchfield',
										editable	: true,
										enableKeyEvents : true,
										width		: 252,
										labelWidth	: 50,
										emptyText	: '조회할 수주번호를 입력하세요.',
										listeners:{
											keydown:function(el,e){
												if(e.keyCode == e.ENTER){
													me.down('[itemId=ordr_search]').fireEvent('click',true);
												}
											}
										}
									},{	name	: 'fabc_idcd', xtype	: 'textfield', hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-15 5 0 0',
								items : [
									{	fieldLabel	: Language.get('prod_name', '제품' ),
										name		: 'prod_name',
										pair		: 'prod_idcd',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										width		: 252,
										labelWidth	: 50,
										margin		: '5 0 0 -10',
										popup		: {
											widget	: 'lookup-prod-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('prod_name'));
												pairField.setValue(records[0].get('prod_idcd'));
											}
										}
									},{	name	: 'prod_idcd', xtype	: 'textfield', hidden : true
									},{	fieldLabel	: Language.get('cstm_name', '수주처' ),
										name		: 'cstm_name',
										pair		: 'cstm_idcd',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										width		: 252,
										labelWidth	: 50,
										margin		: '5 0 0 5',
										popup		: {
											widget	: 'lookup-cstm-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true
									}
								]
							}
						]
					},{	text		: '<span class="btnTemp" style="font-size:1.3em">미발주 자료 가져오기</span>',
						xtype		: 'button',
						itemId		: 'ordr_search',
						width		: 160,
						height		: 50,
						margin		: '7 0 0 20',
						cls			: 'button-style',
						action		: 'selectAction2'
					}
				]
			}
		]
	};
	return item;
	}
});
