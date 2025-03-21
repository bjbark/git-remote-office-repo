Ext.define('module.prod.mold.moldcheck.view.MoldCheckEditor1', { extend: 'Axt.form.Editor',

	alias: 'widget.module-moldcheck-editor1',

	height : 305,
	layout : {
		type: 'border'
	},

	title			: Language.get('mold_idcd','수리정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'mold_idcd',

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
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('line_seqn','항번'),
								name		: 'line_seqn',
								xtype		: 'textfield',
								allowBlank	: false,
								readOnly	: true,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 200,
							},{	fieldLabel	: Language.get('repa_date','일자'),
								xtype		: 'datefield',
								name		: 'repa_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 180
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('repa_entr_name','수리업체명'),
								xtype		: 'textfield',
								name		: 'repa_entr_name',
								width		: 380
							},{	fieldLabel	: Language.get('totl_shot','누계Shot'),
								xtype		: 'numericfield',
								name		: 'totl_shot',
								width		: 180
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('line_seqn','소요시간(분)'),
								name		: 'repa_need_time',
								xtype		: 'textfield',
								width		: 200,
								fieldStyle	: 'text-align: right;'
							},{	fieldLabel	: Language.get('repa_date','수리금액'),
								xtype		: 'numericfield',
								name		: 'need_amnt',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 180
							},{	fieldLabel	: Language.get('updt_expc_shot','수정예상Shot'),
								xtype		: 'numericfield',
								name		: 'updt_expc_shot',
								width		: 180
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('repa_resn','수리사유'),
								xtype		: 'textarea',
								name		: 'repa_resn',
								height		: 50,
								width		: 380
							},{	xtype		: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0',
								items		:[
									{	fieldLabel	: Language.get('updt_expc_date','수정예정일자'),
										xtype		: 'datefield',
										name		: 'updt_expc_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										width		: 180
									},{	fieldLabel	: Language.get('mold_stat_dvcd','조치'),
										name		: 'mold_stat_dvcd',
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('mold_stat_dvcd'),
										width		: 180,
									}
								]
							}
						]
					},{	fieldLabel	: Language.get('repa_cont','수리내용'),
						xtype		: 'textarea',
						name		: 'repa_cont',
						height		: 50,
						width		: 380
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				border:0,
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(),{title : '첨부파일',xtype: 'module-moldcheck-file1'}]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
		item = {
				title		:  Language.get('user_memo','메모'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '내용을 적어주십시오',
						height		: 215,
						flex		: 1
					}
				]
		}
		;
		return item;
	}
});