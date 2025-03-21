Ext.define('module.custom.iypkg.mtrl.po.isttwork1.view.IsttWork1WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-isttwork1-worker-editor',
	header	: false,
	height	: 70,
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
								{	fieldLabel	: Language.get('','발주일자'),
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
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, -30)
								},{	fieldLabel	: Language.get('','~'),
									xtype		: 'betweenfield',
									name		: 'invc_date2',
									pair		: 'invc_date1',
									margin		:'5 5 0 0',
									clearable	: true,
									width		: 101,
									labelWidth	: 5,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date()
								},{	fieldLabel	: Language.get('','매출처'),
									xtype		: 'popupfield',
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									clearable	: true ,
									labelWidth	: 50,
									width		: 252,
									margin		: '5 0 0 0',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0',sale_cstm_yorn : 1 },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
								}
							]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-15 5 0 0',
								items : [
									{	fieldLabel	: Language.get('', '수주번호' ),
											name		: 'invc_numb',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true ,
											width		: 252,
											labelWidth	: 50,
											margin		: '5 0 0 -10',
											popup		: {
												widget	: 'lookup-iypkg-ordr-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0', line_clos : '0'},
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('invc_numb'));
												}
											}
									},{	fieldLabel	: Language.get('','발주처'),
										xtype		: 'popupfield',
										name		: 'cstm_name2',
										pair		: 'cstm_idcd2',
										clearable	: true,
//										hidden		: _global.hq_id.toUpperCase()!='N1000LIEBE',
										labelWidth	: 50,
										width		: 252,
										margin		: '5 0 0 5',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-cstm-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
									}
								]
							}
						]
					},{	text		: '<span class="btnTemp" style="font-size:1.3em">입고대기 자료 가져오기</span>',
						xtype		: 'button',
						width		: 160,
						height		: 50,
						margin		: '10 0 0 0',
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
