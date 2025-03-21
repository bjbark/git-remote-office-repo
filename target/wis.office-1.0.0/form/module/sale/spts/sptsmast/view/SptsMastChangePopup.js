Ext.define('module.sale.spts.sptsmast.view.SptsMastChangePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sptsmast-change-popup',

	title		: '납품처 변경',
	closable	: true,
	autoShow	: true,
	width		: 370 ,
	height		: 200,
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
			itemId	: 'invc',
			margin	: '15 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: '출고지시번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 140,
							readOnly	: true
						},{ fieldLabel	: '출고예정일자',
							xtype		: 'datefield',
							name		: 'ostt_schd_date',
							itemId		: 'ostt_schd_date',
							margin		: '0 0 0 5',
							width		: 165,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '거래처',
							name		: 'cstm_name',
							xtype		: 'textfield',
							itemId		: 'cstm_name',
							width		: 310,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '납품처',
							name		: 'dlvy_cstm_name',
							xtype		: 'textfield',
							itemId		: 'dlvy_cstm_name',
							width		: 310,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '변경할납품처' ),
							name		: 'cstm_name',
							pair		: 'cstm_idcd2',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 310,
							clearable	: false ,
							popup		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
							},{	name : 'cstm_idcd2', xtype	: 'textfield', hidden : true, value : _global.login_id
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
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-sptsmast-lister-master2')[0],
			select	= master.getSelectionModel().getSelection()
		;
//		if(values.invc_numb==''||values.invc_numb==null){
//			Ext.Msg.alert("알림","수주번호를 반드시 입력해주십시오.");
//		}else
//		{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

		Ext.each(select, function(record) {
			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/spts/sptsmast/set/change.do',
				params	: {
					token	: _global.token_id,
					param	: JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: record.get('invc_numb'),
						cstm_idcd2		: values.cstm_idcd2,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "납품처 변경이  완료 되었습니다.");
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
						mask.show();
						master.select({
							 callback : function(records, operation, success) {
								 me.setResponse( {success : true , values :  values });
								if (success) {
								} else {}
								mask.hide();
							}, scope : me
						});
						me.hide();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		})
	}
});
