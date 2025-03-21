Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastPrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-oemmast-print-popup',

	title		: '인수증 출력',
	closable	: true,
	autoShow	: true,
	width		: 310 ,
	height		: 155,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('', '인수처명' ),
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									xtype		: 'popupfield',
									margin		: '20 0 0 0',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true ,
									width		: 250,
									labelWidth	: 75,
									popup		: {
										widget	: 'lookup-cstm-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0', oem_company : 'Y' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('invc_date', '인수일자' ),
									name		: 'invc_date',
									xtype		: 'datefield',
									width		: 175,
									labelWidth	: 75,
									margin		: '5 0 0 0',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			lister = Ext.ComponentQuery.query('module-oemmast-lister-detail')[0],
			record = lister.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase(),
			jrf = 'sjflv_receipt_saleorder2.jrf'
			a = "";
		;

		if(values.cstm_idcd==''||values.cstm_idcd==null){
			Ext.Msg.alert("알림","인수처를 반드시 입력해주십시오.");
			return;
		}else if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","인수일자를 반드시 입력해주십시오.");
			return;
		}else{
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a+= "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('orig_seqn')+'\',\'cstm_idcd\':\''+values.cstm_idcd+'\',\'invc_date\':\''+values.invc_date+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
		}
	}
});
