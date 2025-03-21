Ext.define('module.qc.project.losswork.view.LossWorkEditor2', { extend: 'Axt.form.Editor',

	alias: 'widget.module-losswork-editor2',

	height : 200,
	layout : {
	type: 'border'
	},

	title			: Language.get('pjod_mast_prod','손실공수내역'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'pjod_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(),me.createwest()];
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
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style', itemId:'editor2' }, '-'
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
					{	xtype	: 'textfield',name:'invc_numb',hidden:true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('line_seqn','순번'),
								name		: 'line_seqn',
								xtype		: 'numericfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								width		: 188,
								readOnly	: true
							},{	fieldLabel	: Language.get('work_pric','가공단가'),
								name		: 'work_pric',
								xtype		: 'numericfield',
								width		: 168,
								labelWidth	: 60,
								listeners:{
									change:function(a,val,c){
										var	form = me.down('form');
											timevalue = form.down('[name=work_time]').getValue(),
											h = timevalue.getHours(),
											m = timevalue.getMinutes()/60,
											amnt = form.down('[name=loss_amnt]')
										;
										var value = val*(h+m);
										amnt.setValue(value);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('work_time','가공시간'),
								name		: 'work_time',
								width		: 188,
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi'+'00',
								increment	: 30,
								anchor		: '100%',
								value		: '00:00',
								listeners:{
									change:function(a,val,c){
										var	form = me.down('form');
											work_pric = form.down('[name=work_pric]').getValue(),
											h = val.getHours(),
											m = val.getMinutes()/60,
											amnt = form.down('[name=loss_amnt]')
										;
										var value = work_pric*(h+m);
										amnt.setValue(value);
									}
								}
							},{	fieldLabel	: Language.get('loss_amnt','손실금액'),
								name		: 'loss_amnt',
								xtype		: 'numericfield',
								width		: 168,
								labelWidth	: 60,
								readOnly	: true,
								fieldCls   : 'requiredindex',
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
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('work_cont','가공내용'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'work_cont',
						xtype		: 'textarea',
						emptyText	: '가공내용을 적어주십시오',
						height		: 110,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});