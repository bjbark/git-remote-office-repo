Ext.define('module.notice.noticework.view.NoticeWorkEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-noticework-editor',

	height : 260,
	layout : {
		type : 'border'
	},

	title			: Language.get('',''),
	collapsible 	: true			,
	collapsed		: true			,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 440,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 295, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	fieldLabel	: Language.get('ntce_ttle','제목')	,
						xtype		: 'textfield',
						name		: 'ntce_ttle',
						width		: 405,
						labelWidth	: 95,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						margin		: '0 0 5 0'
					},{	fieldLabel	: Language.get('sbsd_ttle','부제목')	,
						xtype		: 'textfield',
						name		: 'sbsd_ttle',
						width		: 405,
						labelWidth	: 95,
						margin		: '0 0 5 0',
					},{	fieldLabel	: Language.get('dwup_empy_idcd','작성사원ID'),
						xtype		: 'textfield',
						hidden		: true,
						name		: 'dwup_empy_idcd',
						width		: 200,
						labelWidth	: 95,
						margin		: '0 0 5 0'
					},{	fieldLabel	: Language.get('dwup_empy_idcd','작성사원'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'dwup_empy_name',
						pair		: 'dwup_empy_idcd',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						clearable	: false ,
						width		: 220,
						labelWidth	: 95,
						margin		: '0 0 5 0',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-user-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name	: 'dwup_empy_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0 ,margin : '0 0 5 0',
						items	: [
							{	name	: 'invc_numb', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('ntce_stdt','공지기간'),
								xtype		: 'datefield',
								name		: 'ntce_stdt',
								itemId		: 'ntce_stdt',
								width		: 215,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								margin : '0 0 0 5'
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'datefield',
								name		: 'ntce_eddt',
								itemId		: 'ntce_eddt',
								width		: 145,
								labelWidth	: 20,
								root		: true,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +30),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								margin : '0 0 0 0'
							},{	fieldLabel	: Language.get('dwup_date','작성일자'),
								hidden		: true,
								xtype		: 'datefield',
								name		: 'dwup_date',
								itemId		: 'dwup_date',
								width		: 215,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								margin : '0 0 0 5'
							},{	fieldLabel	: Language.get('dwup_time','공지기간'),
								hidden		: true,
								xtype		: 'datefield',
								name		: 'dwup_time',
								itemId		: 'dwup_time',
								width		: 215,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								margin : '0 0 0 5'
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('tele_numb','전화번호')	,
								xtype		: 'textfield',
								name		: 'tele_numb',
								width		: 220,
								labelWidth	: 95,
							},{	fieldLabel	: Language.get('emgc_yorn','긴급'),
								xtype		: 'lookupfield',
								name		: 'emgc_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 185,
								labelWidth	: 100,
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('scrt_yorn','보안'),
								xtype		: 'lookupfield',
								name		: 'scrt_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 220,
								labelWidth	: 95,
							},{	fieldLabel	: Language.get('pswd','비밀번호')	,
								xtype		: 'textfield',
								name		: 'pswd',
								width		: 185,
								labelWidth	: 100,
							}
						]
					},{	fieldLabel	: Language.get('ansr_yorn','답여부'),
						xtype		: 'lookupfield',
						name		: 'ansr_yorn',
						lookupValue	: resource.lookup('yorn'),
						width		: 220,
						labelWidth	: 95,
						margin		: '0 0 5 0'
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [me.createTab2(),]
			}
		;
		return item;
	},

//	createTab1 : function() {
//		var me = this,
//			item = {
//				title	: '공지내용',
//				xtype	: 'form-panel',
//				dock	:'left',
//				region	: 'center',
//				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
//					items	:[
//					{	xtype	: 'htmleditor',
//						name	: 'ntce_cont',
//					}
//				],
//			}
//		;
//		return item;
//	},
	createTab2 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'user_memo',
						itemId		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 167,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea'  ,
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},
});