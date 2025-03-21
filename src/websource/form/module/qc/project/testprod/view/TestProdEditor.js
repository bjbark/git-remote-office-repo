Ext.define('module.qc.project.testprod.view.TestProdEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-testprod-editor',

	height : 300,
	layout : {
		type: 'border'
	},

	title			: Language.get('pjod_mast_prod','시험생산 정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'pjod_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				name			: 'pjod_info',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 355, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd','금형번호'),
								name		: 'pjod_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true,
								hidden		: false
							},{	fieldLabel	: Language.get('orig_seqn','원순번'),
								name		: 'orig_seqn',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true,
								hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('acpt_case_name','금형명'),
									name		: 'item_name',
									xtype		: 'textfield',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									readOnly	: true,
									hidden		: false
								}
							]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('line_seqn','순번'),
								name		: 'line_seqn',
								xtype		: 'numericfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								width		: 167,
								readOnly	: true
							},{	fieldLabel	: Language.get('regi_date','생산일자'),
								name		: 'regi_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 188
							}
						]
					},{	fieldLabel	: Language.get('cvic_name','설비'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cvic-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' , cvic_kind_dvcd : '1000'},
							result	: function(records, nameField, pairField) {
								var panel = me.down('form');
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('wkct_name','공정'),
						xtype		: 'textfield'		,
						name		: 'wkct_name'	,
						readOnly	: true,
						hidden		: true
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('drtr_name','담당자'),
						xtype		: 'popupfield'		,
						editable	: true,
						enableKeyEvents : true,
						name		: 'drtr_name'	,
						pair		: 'drtr_idcd'		,
						clearable	: false ,
						hidden		: false,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-user-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('sttm1','시작시간'),
								name		: 'sttm1',
								xtype		: 'datefield'				,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 188,
								value		: new Date(),
								listeners	: {
									blur: function() {
										var panel = this.up('form');
										if(panel.down('[name=edtm1]').getValue()!= null){
											var panel = this.up('form'),
												edtm = panel.down('[name=edtm1]').getValue();
												time = Number(this.getValue())-Number(edtm);
											if(time > 0){
												Ext.Msg.alert("알림","종료시간을 다시 입력해주십시오.");
												this.setValue(null);
											}
										}
									}
								}
							},{	name		: 'sttm2',
								xtype		: 'timefield',
								margin		: '0 0 0 0',
								format		: 'H:i',
								submitFormat: 'Hi'+'00',
								increment	: 30,
								anchor		: '100%',
								margin		: '0 0 0 5',
								width		: 77,
								value		: '00:00'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('edtm1','종료시간'),
								name		: 'edtm1',
								xtype		: 'datefield'				,
								width		: 188,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								listeners	: {
									blur: function() {
										var panel = this.up('form'),
											sttm = panel.down('[name=sttm1]').getValue();
											time = Number(sttm)-Number(this.getValue());
										if(time > 0){
											Ext.Msg.alert("알림","종료시간을 다시 입력해주십시오.");
											this.setValue(null);
										}
									}
								}
							},{	name		: 'edtm2',
								xtype		: 'timefield',
								margin		: '0 0 0 0',
								format		: 'H:i',
								submitFormat: 'Hi'+'00',
								increment	: 30,
								anchor		: '100%',
								margin		: '0 0 0 5',
								width		: 77,
								listeners	: {
									blur: function() {
										var panel = this.up('form'),
											sttm1 = panel.down('[name=sttm1]').getValue();
											sttm2 = panel.down('[name=sttm2]').getValue();
											edtm1 = panel.down('[name=edtm1]').getValue();
											time = Number(sttm2)-Number(this.getValue());
										if(sttm1-edtm1==0 && time > 0){
											Ext.Msg.alert("알림","종료시간을 다시 입력해주십시오.");
											this.setValue().clear();
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prod_qntt','생산수량'),
								name		: 'prod_qntt',
								xtype		: 'numericfield'				,
								width		: 188,
							},{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								name		: 'poor_qntt',
								xtype		: 'numericfield'				,
								width		: 167,
								labelWidth	: 60,
								hidden		: true,
								listeners	: {
									blur: function() {
										var panel = this.up('form'),
											qntt = panel.down('[name=prod_qntt]').getValue();
											qntt2 = Number(qntt)-Number(this.getValue());
										if(qntt < this.getValue()){
											this.setValue(qntt);
											panel.down('[name=pass_qntt]').setValue('0');
										}else{
											panel.down('[name=pass_qntt]').setValue(qntt2);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pass_qntt','합격수량'),
								name		: 'pass_qntt',
								xtype		: 'numericfield'				,
								width		: 188,
								hidden		: true
							},{	fieldLabel	: Language.get('loss_rate','loss율'),
								name		: 'loss_rate',
								xtype		: 'numericfield'				,
								width		: 167,
								labelWidth	: 60,
								hidden		: true
							}
						]
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
				items	: [ me.createTab1(),{title : '첨부파일',xtype: 'module-testprod-file'}]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: ''		,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 210,
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
	}
});