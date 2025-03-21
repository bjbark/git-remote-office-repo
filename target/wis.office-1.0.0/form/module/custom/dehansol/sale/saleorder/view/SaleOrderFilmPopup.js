Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderFilmPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-film-popup',

	title		: '필름수령 여부',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 150,
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
						{	text : '<span class="write-button">수령</span>', scope: me,handler: me.receiveAction, cls: 'button-style', width: 80 , height	: 60,} ,
						{	text : '<span class="write-button">수령취소</span>', scope: me,handler: me.NotreceiveAction, cls: 'button-style', width: 80	, height	: 60,} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style', width: 80 , height	: 60,	} ,
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
							{	fieldLabel	: Language.get('invc_numb','수주번호'),
								xtype		: 'textfield',
								name		: 'invc_numb',
								itemId		: 'invc_numb',
								labelWidth	: 80,
								width		: 160,
								hidden		: true
							},{	fieldLabel	: Language.get('film_numb','필름번호'),
								xtype		: 'textfield',
								name		: 'film_numb',
								itemId		: 'film_numb',
								labelWidth	: 80,
								width		: 230,
								hidden		: true
							},{	fieldLabel	: Language.get('film_name','필름명'),
								xtype		: 'textfield',
								name		: 'film_name',
								itemId		: 'film_name',
								labelWidth	: 80,
								width		: 230,
								hidden		: true
							},{	fieldLabel	: Language.get('film_acpt_offe','필름수령처'),
								xtype		: 'lookupfield',
								name		: 'film_acpt_offe',
								itemId		: 'film_acpt_offe',
								labelWidth	: 80,
								width		: 220,
								lookupValue	: [['자가보유','자가보유'],['발주처 제공','발주처 제공'],['3자업체 수령','3자업체 수령']]
							},{	fieldLabel	: Language.get('film_acpt_yorn','필름수령여부'),
								xtype		: 'lookupfield',
								name		: 'film_acpt_yorn',
								itemId		: 'film_acpt_yorn',
								readOnly	: true,
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 80,
								width		: 160,
								hidden		: true
							},{	fieldLabel	: Language.get('film_acpt_dttm',''),
								xtype		: 'betweenfield',
								name		: 'film_acpt_dttm',
								pair		: 'film_acpt_dttm',
								labelWidth	: 99,
								width		: 198,
								value		: '',
								hidden		:true
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
	 * 수령 버튼 이벤트
	 */

	receiveAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			select	= master.getSelectionModel().getSelection()
			;


		if (select) {
			Ext.each(select, function(record) {
				record.dirtyValue('film_acpt_yorn', '1');
				record.store.commitChanges();
			});
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/film.do',
					params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							invc_numb		: record.get('invc_numb'),
							film_acpt_yorn	: '1',
							film_acpt_offe	: values.film_acpt_offe,
							table			: 'acpt_spec_dehan',
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
	},

	/**
	 * 수령취소 버튼 이벤트
	 */

	NotreceiveAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			select	= master.getSelectionModel().getSelection()
		;

		if(values.film_acpt_yorn=='0'){
			Ext.Msg.alert("알림","필름수령이 이미 안되있는상태입니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();


			if (select) {
				Ext.each(select, function(record) {
					record.dirtyValue('film_acpt_yorn', '0');
					record.store.commitChanges();
				});
				Ext.each(select, function(record) {
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/film2.do',
						params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
								invc_numb		: record.get('invc_numb'),
								film_acpt_yorn	: '0',
								film_acpt_dttm	: values.film_acpt_dttm,
								film_acpt_offe	: '',
								table_nm		: 'acpt_spec_dehan',
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
								me.setResponse( {success : true , values :  values });
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
	},
});
