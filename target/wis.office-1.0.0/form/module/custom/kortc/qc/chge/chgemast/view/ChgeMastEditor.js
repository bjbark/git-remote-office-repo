 Ext.define('module.custom.kortc.qc.chge.chgemast.view.ChgeMastEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-chgemast-editor',
	height		: 350,
	layout		: { type: 'border' },
	title		: Language.get('clam_info',''),
	collapsible	: true,
	collapsed	: true 	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest() ] ;
		me.items       = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text : '<span class="write-button">저장</span>', action : 'updateAction'	, cls: 'button-style',itemId:'lister1'},
					{ text : '<span class="write-button">저장</span>', action : 'updateAction2'	, cls: 'button-style',itemId:'lister2',hidden:true},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style',itemId:'cancel'},
					'-'
				]
			};
		return item;
	},

	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 440,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '10 0 0 -30',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{ 	fieldLabel	: Language.get('','거래처'),
											xtype		: 'textfield',
											name		: 'cstm_idcd',
											readOnly	: true,
											margin		: '0 0 0 5',
											labelWidth	: 95,
											width		: 165,
										},{	fieldLabel	: Language.get('cstm',''),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											margin		: '1 0 0 5',
											name		: 'cstm_name',
											width		: 205,
											pair		: 'cstm_idcd',
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{ 	fieldLabel	: Language.get('','품목'),
											xtype		: 'textfield',
											name		: 'item_code',
											readOnly	: true,
											labelWidth	: 95,
											width		: 165,
											margin		: '0 0 0 5',
										},{	fieldLabel	: Language.get('cstm',''),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											margin		: '1 0 0 5',
											name		: 'item_name',
											width		: 205,
											pair		: 'item_code',
											clearable	: true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-item-popup-kortc',
												params	: { stor_grp : _global.stor_grp , line_stat : '0'},
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('item_name'));
													pairField.setValue(records[0].get('item_code'));
												}
											}
										},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','차종'),
											xtype		: 'textfield',
											name		: 'crty_bacd',
											readOnly	: true,
											labelWidth	: 80,
											width		: 150,
											margin		: '0 0 0 20',
										},{	fieldLabel	: Language.get('','접수일자'),
											xtype		: 'datefield',
											name		: 'rcpt_date',
											labelWidth	: 99,
											width		: 199,
											margin		: '0 0 0 10',
											root		: true,
											format		: Const.DATE_FORMAT_YMD_BAR,
								    	 	submitFormat: Const.DATE_FORMAT_YMD
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
									items	: [
										{	xtype		: 'label',
											text		: '4M 구분',
											width		: 100,
											margin		: '2 0 0 70',
										},{	xtype		: 'checkbox',
											boxLabel	: '사람',
											name		: '4mdv_1fst',
											width		: 50,
											margin		: '0 0 0 -55',
											listeners: {
												change: function(chkbox,newVal,oldVal){
													me.down('[name=chck_yorn]').setValue('1')
												}
											}
										},{	xtype		: 'checkbox',
											boxLabel	: '재료',
											name		: '4mdv_2snd',
											width		: 50,
											margin		: '0 0 0 30',
											value		: '',
											listeners: {
												change: function(chkbox,newVal,oldVal){
													me.down('[name=chck_yorn]').setValue('1')
												}
											}
										},{	xtype		: 'checkbox',
											boxLabel	: '기계',
											name		: '4mdv_3trd',
											width		: 50,
											margin		: '0 0 0 30',
											listeners: {
												change: function(chkbox,newVal,oldVal){
													me.down('[name=chck_yorn]').setValue('1')
												}
											}
										},{	xtype		: 'checkbox',
											boxLabel	: '방법',
											name		: '4mdv_4frt',
											width		: 50,
											margin		: '0 0 0 30',
											listeners: {
												change: function(chkbox,newVal,oldVal){
													me.down('[name=chck_yorn]').setValue('1')
												}
											}
										},{	xtype		: 'textfield',
											name		: 'chck_yorn',
											hidden		: true
										}
									]
									},{	xtype : 'fieldset',
										layout: 'hbox',
										border: 0,
										margin: '0 0 5 0',
										items : [
											{ fieldLabel	: Language.get('','변경사유'),
												xtype		: 'textfield',
												name		: 'chge_resn',
												labelWidth	: 100,
												width		: 380,
											}
										]
									},{	xtype : 'fieldset',
											layout: 'hbox',
											border: 0,
											margin: '5 0 0 0',
											items : [
												{	fieldLabel	:  Language.get( '' , '비고'),
													name		: 'remk_text',
													xtype		: 'textarea',
													width		: 350,
													height		: 80,
													margin		: '0 0 0 30',
												}
											]
									},{	fieldLabel	: Language.get('modify','수정'),
										xtype		: 'textfield',
										name		: 'modify',
										width		: 170,
										hidden		: true
									}
								]
							}
						]
					}
				]
			}
		;
		return item;
	},
	/**
	 *
	 */


	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab3(),
				          {title : '4M 변경 의뢰서',xtype: 'module-chgemast-filelister', hidden: true}
				]
			}
		;
		return tabs;
	},

	createTab3 : function() {
		var me = this,
			item = {
				title	: '추가정보',
				xtype	: 'form-panel',
				name	: 'edit_tab3',
				dock	: 'left',
				region	: 'center',
				fieldDefaults	: { width : 290, labelWidth : 70, labelSeparator : ''},
				items	: [
		     	   {	xtype 	: 'fieldset',
				    	border	: 2,
				    	margin	: '30 0 15 40',
				    	padding	: '0',
				    	layout	: 'hbox',
				    	width	: 900,
				    	height	: 40,
				    	items	: [
				    	    {	xtype	: 'label',
				    	    	text	: 'ISIR',
				    	    	margin	: '0',
				    	    	padding	: '0',
				    	    	width	: 70,
				    	    	height	: '100%',
								style	: 'text-align:center; font-size: 14px !important; color: black; background: #00CCFF; line-height: 36px;',
				    	 	},{	xtype		: 'datefield',
				    	 		fieldLabel	: '제출일자',
				    	 		name		: 'isir_sbmt_date',
				    	 		margin		: '5 0',
				    	 		format		: Const.DATE_FORMAT_YMD_BAR,
					    	 	submitFormat: Const.DATE_FORMAT_YMD,
				    	 		width		: 170
				    	 	},{	xtype		: 'datefield',
				    	 		fieldLabel	: '승인일자',
				    	 		name		: 'isir_apvl_date',
				    	 		margin		: '5 0',
				    	 		format		: Const.DATE_FORMAT_YMD_BAR,
					    	 	submitFormat: Const.DATE_FORMAT_YMD,
				    	 		width		: 170
				    	 	}
				    	]
				   },{	xtype 	: 'fieldset',
				    	border	: 2,
				    	margin	: '15 0 0 40',
				    	padding	: '0',
				    	layout	: 'hbox',
				    	width	: 900,
				    	height	: 40,
				    	items	: [
				    	    {	xtype	: 'label',
				    	    	text	: '초도품',
				    	    	margin	: '0',
				    	    	padding	: '0',
				    	    	width	: 70,
				    	    	height	: '100%',
				    	    	style	: 'text-align:center; font-size: 14px !important; color: black; background: #00CCFF; line-height: 36px;',
				    	 	},{	xtype		: 'datefield',
				    	 		fieldLabel	: '적용일자',
				    	 		name		: 'fart_adpt_date',
				    	 		margin		: '5 0',
				    	 		format		: Const.DATE_FORMAT_YMD_BAR,
					    	 	submitFormat: Const.DATE_FORMAT_YMD,
				    	 		width		: 170
				    	 	},{	xtype		: 'datefield',
				    	 		fieldLabel	: '납품일자',
				    	 		name		: 'fart_dlvy_date',
				    	 		margin		: '5 0',
				    	 		format		: Const.DATE_FORMAT_YMD_BAR,
					    	 	submitFormat: Const.DATE_FORMAT_YMD,
				    	 		width		: 170
				    	 	},{	xtype		: 'datefield',
				    	 		fieldLabel	: '생산LOT',
				    	 		name		: 'fart_prod_lott',
				    	 		margin		: '5 0',
				    	 		format		: Const.DATE_FORMAT_YMD_BAR,
					    	 	submitFormat: Const.DATE_FORMAT_YMD,
				    	 		width		: 170
				    	 	}
				    	]
				   },{	xtype 	: 'fieldset',
				    	border	: 2,
				    	margin	: '15 0 0 40',
				    	padding	: '0',
				    	layout	: 'hbox',
				    	width	: 900,
				    	height	: 40,
				    	items	: [
				    	    {	xtype	: 'label',
				    	    	text	: '초기유동',
				    	    	margin	: '0',
				    	    	padding	: '0',
				    	    	width	: 70,
				    	    	height	: '100%',
				    	    	style	: 'text-align:center; font-size: 14px !important; color: black; background: #00CCFF; line-height: 36px;',
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '1LOT',
				    	 		name	: 'mvfr_lott_1fst',
				    	 		margin	: '6 0 0 35',
				    	 		width		: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '2LOT',
				    	 		name	: 'mvfr_lott_2snd',
				    	 		margin	: '6 0',
				    	 		width	: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '3LOT',
				    	 		name	: 'mvfr_lott_3trd',
				    	 		margin	: '6 0',
				    	 		width	: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	}
				    	]
				   },{	xtype 	: 'fieldset',
				    	border	: 2,
				    	margin	: '15 0 0 40',
				    	padding	: '0',
				    	layout	: 'hbox',
				    	width	: 900,
				    	height	: 40,
				    	items	: [
				    	    {	xtype	: 'label',
				    	    	text	: '유효성',
				    	    	margin	: '0',
				    	    	padding	: '0',
				    	    	width	: 70,
				    	    	height	: '100%',
				    	    	style	: 'text-align:center; font-size: 14px !important; color: black; background: #00CCFF; line-height: 36px;',
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '1개월',
				    	 		name	: 'chek_yorn_1fst',
				    	 		margin	: '6 0 0 35',
				    	 		width		: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '2개월',
				    	 		name	: 'chek_yorn_2snd',
				    	 		margin	: '6 0',
				    	 		width	: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	},{	xtype	: 'checkbox',
				    	 		boxLabel: '3개월',
				    	 		name	: 'chek_yorn_3trd',
				    	 		margin	: '6 0',
				    	 		width	: 110,
				    	 		listeners: {
									change: function(chkbox,newVal,oldVal){
										me.down('[name=chck_yorn]').setValue('1')
									}
								}
				    	 	}
				    	]
				   }
				]
    		}
		;
		return item;
	},
});

