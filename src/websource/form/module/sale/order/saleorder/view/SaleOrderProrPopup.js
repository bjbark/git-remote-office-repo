Ext.define('module.sale.order.saleorder.view.SaleOrderProrPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-pror-popup',

	title		: '작업지시 등록',
	closable	: true,
	autoShow	: true,
	width		: 360 ,
	height		: 250,
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
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: '수주번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 170,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 10 5 -30',
					items	: [
						{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'user_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							value		: _global.login_nm,
							width		: 170,
							clearable	: false ,
							hidden		: true ,
						},{ fieldLabel	: Language.get('','시작일자'),
							xtype		: 'betweenfield',
							name		: 'plan_sttm',
							pair		: 'plan_edtm',
							labelWidth	: 100,
							width		: 200,
							root		: true,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{ fieldLabel	: Language.get('','종료일자'),
							xtype		: 'betweenfield',
							fieldLabel	:'~ 종료일자',
							name		: 'plan_edtm',
							pair		: 'plan_sttm',
							labelWidth	: 60,
							width		: 170,
							value		: new Date(),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	:  Language.get( '' , '우선순위'),
							name		: 'pref_rank',
							xtype		: 'numericfield',
							minvalue	:	'0',
							width		: 170,
						},{	name : 'drtr_idcd', xtype	: 'textfield', itemId	: 'drtr_idcd',hidden : true, value : _global.login_id
						},{	name : 'item_idcd', xtype	: 'textfield', itemId	: 'item_idcd',hidden : true,
						},{	name : 'invc_date', xtype	: 'textfield', itemId	: 'invc_date',hidden : true,
						},{	name : 'line_seqn', xtype	: 'textfield', itemId	: 'line_seqn',hidden : true,
						},{	name : 'cstm_idcd', xtype	: 'textfield', itemId	: 'cstm_idcd',hidden : true,
						},{	name : 'invc_qntt', xtype	: 'textfield', itemId	: 'invc_qntt',hidden : true,
						},{	name : 'amnd_degr', xtype	: 'textfield', itemId	: 'amnd_degr',hidden : true,
						},{	name : 'wkfw_idcd', xtype	: 'textfield', itemId	: 'wkfw_idcd',hidden : true,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	:  Language.get( '' , '비고'),
							name		: 'remk_text',
							xtype		: 'textarea',
							width		: 340,
							height		: 65,
							value 		: " "
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
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			params  = me.params,
			url		= ""
		;
		if(params.pror_numb){
			url = "/sale/order/saleorder/set/prorupdate.do";
		}else{
			url = "/sale/order/saleorder/set/pror.do";
		}
		var record = [];
			record.push({	invc_numb	: values.invc_numb,
							line_seqn	: values.line_seqn,
							item_idcd	: values.item_idcd,
							plan_sttm	: values.plan_sttm,
							plan_edtm	: values.plan_edtm,
							pref_rank	: values.pref_rank,
							cstm_idcd	: values.cstm_idcd,
							acpt_qntt	: values.invc_qntt,
							amnd_degr	: values.amnd_degr,
							wkfw_idcd	: values.wkfw_idcd,
							invc_date	: values.invc_date,
							remk_text	: values.remk_text,
							crte_idcd	: _global.login_pk,

							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd});
			var mask 	= new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + url,
				params	: {
					token : _global.token_id,
					param	: JSON.stringify({
						records : record
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "등록이  완료 되었습니다.");
					master.getStore().reload();
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						me.setResponse( {success : true , values :  values });
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  // 성공 실패 관계 없이 호출된다.
					mask.hide();
				}
			});

	}
});
