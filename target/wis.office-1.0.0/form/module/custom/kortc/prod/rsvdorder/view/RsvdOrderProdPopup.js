Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderProdPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-rsvdorder-prod-popup',

	title		: '생산지시',
	closable	: true,
	autoShow	: true,
	width		: 265 ,
	height		: 300,
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
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' },
						'->' ,
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me     = this,
			detail = Ext.ComponentQuery.query('module-rsvdorder-lister-detail')[0],
			select = detail.getSelectionModel().getSelection()[0],
			master = Ext.ComponentQuery.query('module-rsvdorder-lister-master')[0],
			record = master.getSelectionModel().getSelection()[0]
		;
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			fieldDefaults: {
				labelWidth: 60,
				labelStyle: 'text-align:right',
				width		: 220,
				labelSeparator : '',
			},
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('wkfw_name','생산라인'),
									name		: 'wkfw_name',
									pair		: 'wkfw_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									fieldCls	: 'requiredindex',
									margin		: '10 0 5 5',
									allowBlank	: false,
									clearable	: false ,
									labelWidth	: 70,
									width		: 230,
									popup		: {
										widget	: 'lookup-wkfw-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0'},
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('wkfw_name'));
											pairField.setValue(records[0].get('wkfw_idcd'));
										}
									}
								},{	name : 'wkfw_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('cvic_name','설비'),
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									fieldCls	: 'requiredindex',
									margin		: '10 0 5 5',
									allowBlank	: false,
									clearable	: false ,
									labelWidth	: 70,
									width		: 230,
									popup		: {
										widget	: 'lookup-cvic-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0'},
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	name : 'cvic_idcd', xtype	: 'textfield', hidden : true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('strt_date','착수일자'),
											xtype		: 'datefield',
											name		: 'strt_date',
											margin		: '0 0 5 5',
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											width		: 170,
										},{	name		: 'strt_time',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											width		: 60,
											value		: new Date()
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('endd_date','종료일자'),
											xtype		: 'datefield',
											name		: 'endd_date',
											margin		: '0 0 5 5',
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											width		: 170,
										},{	name		: 'endd_time',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											width		: 60,
											value		: new Date()
										}
									]
								},{	fieldLabel	: Language.get('lott_numb', 'Lot번호' ),
									xtype		: 'textfield',
									name		: 'lott_numb',
									margin		: '0 0 5 5',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									labelWidth	: 70,
									width		: 230,
								},{	fieldLabel	: Language.get('invc_qntt', '지시수량' ),
									xtype		: 'numericfield',
									name		: 'invc_qntt',
									itemId		: 'invc_qntt',
									value		: select.get('invc_qntt'),
									margin		: '0 0 5 5',
									labelWidth	: 70,
									width		: 230,
									readOnly	: true
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			detail	= Ext.ComponentQuery.query('module-rsvdorder-lister-detail')[0],
			master	= Ext.ComponentQuery.query('module-rsvdorder-lister-master')[0],
			record	= master.getSelectionModel().getSelection()[0],
			select = detail.getSelectionModel().getSelection()[0]
		;
		if(values.wkfw_idcd==''||values.wkfw_idcd==null){
			Ext.Msg.alert("알림","생산라인을 반드시 입력해주십시오.");
			return;
		}else if(values.strt_date==''||values.strt_date==null){
			Ext.Msg.alert("알림","착수일자를 반드시 입력해주십시오.");
			return;
		}else if(values.endd_date==''||values.endd_date==null){
			Ext.Msg.alert("알림","종료일자를 반드시 입력해주십시오.");
			return;
		}else if(values.lott_numb==''||values.lott_numb==null){
			Ext.Msg.alert("알림","LOT번호를 반드시 입력해주십시오.");
			return;
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/plan/rsvdorder/set/pror.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						invc_numb	: select.get('invc_numb'),
						line_seqn	: select.get('line_seqn'),
						wkfw_idcd	: values.wkfw_idcd,
						strt_dttm	: values.strt_date + values.strt_time,
						endd_dttm	: values.strt_date + values.endd_time,
						lott_numb	: values.lott_numb,
						cvic_idcd	: values.cvic_idcd,
						invc_qntt	: select.get('invc_qntt')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
						mask.show();
						detail.select({
							 callback : function(records, operation, success) {
								if (success) {
								} else {}
								mask.hide();
							}, scope : me
						}, { invc_numb : record.get('invc_numb') , invc_qntt : record.get('invc_qntt') });
						me.hide();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	}
});
