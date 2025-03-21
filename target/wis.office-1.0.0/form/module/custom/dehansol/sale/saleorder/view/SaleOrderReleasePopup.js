Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderReleasePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-release-popup',

	title		: '출고일자 선택',
	closable	: true,
	autoShow	: true,
	width		: 180 ,
	height		: 120,
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
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '출고일자',
									xtype		: 'datefield',
									name		: 'ostt_date',
									width		: 160,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date()
								},{	fieldLabel	: Language.get('cstm_idcd','거래처'),
									xtype		: 'textfield',
									name		: 'cstm_idcd',
									itemId		: 'cstm_idcd',
									margin		: '0 20 0 0' ,
									labelWidth	: 80,
									width		: 150,
									hidden		: true
								},{	fieldLabel	: Language.get('invc_numb','수주번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									labelWidth	: 80,
									width		: 150,
									hidden		: true
								},{	fieldLabel	: Language.get('line_seqn','순번'),
									xtype		: 'textfield',
									name		: 'line_seqn',
									itemId		: 'line_seqn',
									labelWidth	: 80,
									width		: 150,
									hidden		: true
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
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			record	= master.getSelectionModel().getSelection(),
			select	= master.getSelectionModel().getSelection()[0],
			param	=''
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var a =[];
		for(var i =0; i< record.length ; i++){
			a.push({invc_numb : record[i].get('invc_numb'),line_seqn : record[i].get('line_seqn')});
		}
		param = JSON.stringify({
				cstm_idcd	: select.data.cstm_idcd,
				ostt_date	: select.data.invc_date,
				records		: a
			});
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/release.do',
			params	: {
				token : _global.token_id,
				param :  JSON.stringify({
					param			: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
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
					master.select({
						 callback : function(records, operation, success) {
							if (success) {
							} else {}
							mask.hide();
						}, scope : me
					});
					me.hide();
				}
				Ext.Msg.alert("알림", "출고작성이 완료 되었습니다.");
				master.getStore().reload();
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	}
});
