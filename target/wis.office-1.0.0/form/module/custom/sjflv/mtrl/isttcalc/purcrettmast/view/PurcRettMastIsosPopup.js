Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.view.PurcRettMastIsosPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-purcrettmast-isos-popup'			,

	title: '반품처리',

	closable: true,
	autoShow: true,
	width: 280,
	height: 150,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

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
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , handler : me.finishAction , cls: 'button-style' },
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: { type: 'vbox', /*align: 'stretch'*/} ,
			items	: [
				{	fieldLabel	: '반품처리',
					name		: 'rett_proc_dvcd',
					xtype		: 'lookupfield',
					width		: 200,
					editable	: false,
					margin		: '5 0 0 5',
					lookupValue	: resource.lookup('rett_proc_dvcd'),
					listeners	: {
						beforeselect: function(self, value, index, eOpts ) {
							var old_rett_proc_dvcd = me.down('[name=rett_proc_dvcd2]').value;

							if (old_rett_proc_dvcd == "6000") {
								Ext.Msg.alert("알림","폐기취소되어  반품처리를 할 수 없습니다.");
								return false;
							} else if (old_rett_proc_dvcd == "5000") {
								if (value.get('code') < 6000) {
									Ext.Msg.alert("알림","불량폐기되어  반품처리를 할 수 없습니다.");
									return false;
								}
							} else {
								me.down('[name=proc_dttm]').setValue("");
								me.down('[name=proc_dttm]').hide();

								if (value.get('code') == "6000") {
									me.down('[name=proc_dttm]').show();
									Ext.Msg.alert("알림","불량폐기 처리상태가 아니므로  폐기취소를 할 수 없습니다.");
									return false;
								} else if (value.get('code') == "5000") {
									me.down('[name=proc_dttm]').show();
								}
							}
						}
					}
				},{	fieldLabel	: Language.get('invc_numb','반품번호'),
					xtype		: 'lookupfield',
					name		: 'invc_numb',
					readOnly	: true,
					hidden		: true,
					fieldCls	: 'readonlyfield',
					width		: 170,
					lookupValue	: resource.lookup('invc_numb'),
					value		: me.params.data.invc_numb,
				},{	fieldLabel	: Language.get('line_seqn','line_seqn'),
					xtype		: 'numericfield',
					name		: 'line_seqn',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					hidden		: true,
					width		: 170,
					value		: me.params.data.line_seqn,
				},{	fieldLabel	: Language.get('orig_invc_numb','orig_invc_numb'),
					xtype		: 'numericfield',
					name		: 'orig_invc_numb',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					hidden		: true,
					width		: 170,
					value		: me.params.data.orig_invc_numb,
				},{	fieldLabel	: Language.get('lott_numb','lott_numb'),
					xtype		: 'textfield',
					name		: 'lott_numb',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					hidden		: true,
					width		: 170,
					value		: me.params.data.lott_numb,
				},{	fieldLabel	: Language.get('lott_numb','반품구분'),
					xtype		: 'textfield',
					name		: 'rett_proc_dvcd2',
					value		: me.params.data.rett_proc_dvcd,
					hidden		: true,
				},{	fieldLabel	: Language.get('proc_dttm', '폐기일자' ),
					name		: 'proc_dttm',
					xtype		: 'datefield',
					margin		: '5 0 0 5',
					width		: 200,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					hidden		: true,
				}
			]
		};
		return form;
	},

	/**
	 *
	 * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction: function(a,b,c){
		var me = this,
			baseform= me.up('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-goodsrettwork-lister-detail')[0],
			select	= master.getSelectionModel().getSelection()
		;

		if( values.rett_proc_dvcd=="5000" && Ext.isEmpty(values.proc_dttm)) {
			Ext.Msg.alert("알림","폐기일자를 반드시 입력해주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		if (select) {
			Ext.each(select, function(record) {
//				record.dirtyValue('film_acpt_yorn', '0');
				record.store.commitChanges();
			});
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url		: _global.location.http() + '/stock/goodsrettwork/set/isosPopup.do',
					params	: {
					token	: _global.token_id,
					param	: JSON.stringify({
							invc_numb		: record.get('invc_numb'),
							line_seqn		: record.get('line_seqn'),
							lott_numb		: values.lott_numb,
							rett_proc_dvcd	: values.rett_proc_dvcd,
							proc_dttm		: values.proc_dttm,
							table_nm		: 'sale_rett_item',
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						master.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							Ext.Msg.alert("알림", "저장되었습니다.");
							baseform.ownerCt.close()
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
					}
				});
			})
		}
	}
});