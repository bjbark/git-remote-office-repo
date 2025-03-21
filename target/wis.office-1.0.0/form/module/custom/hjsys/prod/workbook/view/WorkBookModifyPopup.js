Ext.define('module.custom.hjsys.prod.workbook.view.WorkBookModifyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-hjsys-workbook-modifypopup',

	title		: '수정',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 210,
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
						{	text : '<span class="write-button">저장</span>', scope: me, handler: me.update , cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close  , cls: 'button-style'} ,
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
					margin	: 5,
					items	: [
						{	fieldLabel	: '시작일시',
							xtype		: 'datefield',
							name		: 'work_stdt',
							width		: 170,
							editable	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.popup.params.work_stdt,
							listeners	:{
								change	: function(field,val){
									me.down('[name=work_eddt]').setMinValue(val);
									me.down('[name=work_eddt]').setValue(val);
								}
							}
						},{	name		: 'work_sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'His',
							margin		: '1 0 0 5',
							editable	: true,
							width		: 60,
							value		: me.popup.params.work_sttm

						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: 5,
					items	: [
						{	fieldLabel	: '종료일시',
							xtype		: 'datefield',
							name		: 'work_eddt',
							width		: 170,
							editable	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.popup.params.work_eddt,
							minValue	: me.popup.params.work_stdt
						},{	name		: 'work_edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'His',
							editable	: true,
							margin		: '1 0 0 5',
							width		: 60,
							value		: me.popup.params.work_edtm

						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: 3,
					items	: [
						{	fieldLabel	: '생산수량',
							xtype		: 'numericfield',
							name		: 'prod_qntt',
							width		: 170,
							value		: me.popup.params.prod_qntt,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: 3,
					items	: [
						{	fieldLabel	: '양품수량',
							xtype		: 'numericfield',
							name		: 'good_qntt',
							width		: 170,
							value		: me.popup.params.good_qntt,
						}
					]
				}
			]
		};
		return form;
	},


	update: function(){
		var me = this,
			form= me.down('form'),
			values	= form.getValues(),
			endd_time,strt_time,
			lister = Ext.ComponentQuery.query('module-hjsys-workbook-lister')[0]
		;
		endd_time = values.work_eddt+values.work_edtm;
		strt_time = values.work_stdt+values.work_sttm;
		if(endd_time && strt_time){
			if(strt_time<=endd_time){
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/hjsys/prod/workbook/set/modify.do',
					params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							invc_numb		: me.popup.params.invc_numb,
							prog_stat_dvcd	: me.popup.params.prog_stat_dvcd,
							work_endd_dttm	: endd_time,
							work_strt_dttm	: strt_time,
							prod_qntt		: values.prod_qntt,
							good_qntt		: values.good_qntt,
							updt_idcd		: _global.login_pk
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
							lister.getStore().reload();
							me.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}else{
				Ext.Msg.alert('알림','일자를 확인해주세요.');
			}
		}else{
			Ext.Msg.alert('알림','일자를 선택해주세요.');
		}
	},
});
