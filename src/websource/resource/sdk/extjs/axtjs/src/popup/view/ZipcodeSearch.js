
Ext.define('Axt.popup.view.ZipcodeSearch', { extend: 'Axt.popup.Search',

	alias   : 'widget.popup-zipcode-search',
	id      : 'popup-zipcode-search',
	title   : '우편번호 찾기',
	closable: true,
	autoShow: true,
	width   : 800,
	height  : 600,
	layout : 'fit',
	initComponent: function(config){
		var me = this;
		if (me.popup.select == 'DAUM') {
			me.width   = 520;
			me.height  = 425;
			me.items = [ me.createDaum() ];
		} else {
			me.items = [ me.createForm() ];
		}
		me.callParent(arguments);
	},
	listeners: {
		show : function ( ) {
			var me = this;
			if (me.popup.select == 'DAUM') {
				element = document.getElementById('ext_address');
				element.style.display = 'block';

				new daum.Postcode({
					oncomplete: function(data) {
//						var i,
//							arry = data.address1.split(" ")
//						;
//						for (i = 3; i < arry.length; i++)
//						{
//							arry[2] = arry[2] + ' ' + arry[i];
//						}
						me.setResponse(
						[
							data
						]
						);
					},
					width : '100%',
					height : '100%'
				}).embed( element  );
			}
		}
	},
	// 다음 API 사용시
	createDaum : function () {
		var me = this,
			card = {
				layout	: 'border',
				border	: 0 ,
				items	: [
					{
						xtype : 'component'  ,
						id    : 'ext_address'
					}
				]
			}
		return card ;
	},

	// 내부 주소 사용시
	createForm : function () {
		var me = this,
			buttons = {
				items : [
					{	xtype  : 'tbfill'  } ,
					{	xtype  : 'button'    ,
						text   : Const.SELECT.text ,
						iconCls: Const.SELECT.icon ,
						action : Const.SELECT.action
					},
					{   xtype  : 'tbspacer' }
				]
			},
			card = {
				layout : 'border',
				border: 0 ,
				dockedItems : [ me.searchForm() ],
				items : [
					{   xtype   : 'tab-panel',
						itemId  : 'mainpanel',
						tabBar  : buttons ,
						items   : [
							me.createGrid1(),
							me.createGrid2()
						]
				}
			]
		};
		return card;
	},


	searchForm: function(){
		var me = this, form =
		{
			xtype: 'form-search',
			bodyStyle: { padding: '0', background: 'transparent' },
			layout       : { type: 'vbox' },
			fieldDefaults: { labelAlign : 'right', height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items        : [
				{
					xtype : 'fieldset',
					items : [
						{	xtype		: 'searchfield' ,
							itemId		: 'initfocused',
							name		: 'find_name',
							fieldLabel	: '검색어',
							width		: 200
						},{
							xtype		: 'button'      ,
							text		: Const.SELECT.text ,
							iconCls		: Const.SELECT.icon,
							scope		: me,
							handler		: me.selectAction ,
							margin		: '0 0 0 5'
						}
					]
				}
			] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},
	createGrid1: function(){
		var  me = this,
			grid = {
				xtype   : 'grid-panel',
				header  : false,
				region  : 'center',
				itemId  : 'roadzip' ,
				title   : '도로주소',
				viewConfig: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store   : Ext.create('Axt.popup.store.ZipcodeSearch'),
				paging  :
				{
					xtype: 'grid-paging',
					items: [
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close }
					]
				},
				columns: [
					{   dataIndex: '_zip_cd'	, width:  70, text: Language.get('zip_cd',	'우편번호'	), align : 'center' },
					{   dataIndex: 'state'		, width:  80, text: Language.get('state',   '시/도'    	)},
					{   dataIndex: 'city'		, width: 100, text: Language.get('city',   	'군/구'    	)},
					{   dataIndex: 'road_nm'	, width: 150, text: Language.get('road_nm',	'도로명'  	)},
					{   dataIndex: 'bunji'		, width: 100, text: Language.get('building_no', '건물번호' )},
					{   dataIndex: 'addr_2'	, width: 150, text: Language.get('building_nm', '건물명'   )}
				],
				listeners: {
					 itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					 },
					 render: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							 target: me.getEl(),
							 eventName : 'keyup',
							 binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemdblclick', me.getView() ); }}]
						});
					}
				}
			}
		;
		return grid;
	},
	createGrid2: function(){
		var  me = this,
			grid = {
				xtype   : 'grid-panel',
				header  : false,
				region  : 'center',
				itemId  : 'zipcode' ,
			title   : '이전주소',
				viewConfig: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store   : Ext.create('Axt.popup.store.ZipcodeSearch'),
				paging  : {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close }
					 ]
				},
				columns: [
					{   dataIndex: '_zip_cd'	, width:  70, text: Language.get('zip_cd'	, '우편번호'	), align : 'center' },
					{   dataIndex: 'state'		, width:  80, text: Language.get('state'	, '시/도'  	)},
					{   dataIndex: 'city'		, width: 100, text: Language.get('city'		, '군/구'	)},
					{   dataIndex: 'dong'		, width: 100, text: Language.get('dong'		, '읍/면/동'	)},
					{   dataIndex: 'bunji'		, width: 100, text: Language.get('bunji'	, '번지'		)},
					{   dataIndex: 'addr_2'		, width: 200, text: Language.get('addr_2'	, '상세주소'	)},
					{   dataIndex: 'island'		, width:  50, text: Language.get('island'	, '도서'		), xtype: 'lookupcolumn' ,
							 lookupValue : resource.getList('island'), align : 'center'
						 }
				],
				listeners: {
					 itemdblclick: function(dataview, index, item, e) {

						Ext.Msg.show({ title: '알림', msg: "도로주소를 사용하시겠습니까?" , icon: Ext.Msg.INFO, buttons: Ext.Msg.YESNO, defaultFocus: 'yes', scope: me,
							fn : function (button) {

								if ( button === 'yes' ) {
									var  me    = this ;
									tpanel = dataview.ownerCt.ownerCt , // me.down('#mainpanel') //me.down('#mainpanel'), createForm
									tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
									select = tpanel.down('#zipcode').getSelectionModel().getSelection()[0],
									searchvalue = tpanel.ownerCt.down('form').getValues()
									;
									tpanel.setActiveTab(0);
									var store =  tpanel.down('#roadzip').getStore(); //me.down('grid').getStore(),
									var param = Ext.merge( { gubun : 'road', zip_id : select.get('zip_id') }  ); // searchvalue,
									store.load({
										params   : {param:JSON.stringify(param)},
										scope    : me,
										callback : function(records, operation, success) {
											tpanel.down('#roadzip').getSelectionModel().select(0);
										}
									});
								} else {
									this.finishAction();
								}
							}
						});

					},
					render: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							 target: me.getEl(),
							 eventName : 'keyup',
							 binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemdblclick', me.getView() ); }}]
						});
					}
				}
		}
		;
		return grid;
	},

	selectAction: function(){
		var  me    = this
			store = undefined ,
			param = undefined ,
			tpanel = me.down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			;


		if ( tindex == 0) {
			if ( !me.down('form').getValues().find_name ){
				resource.showError( '검색어를 입력해주시기 바랍니다.');
				return;
			}

			store =  me.down('#roadzip').getStore();
			param = Ext.merge( me.down('form').getValues(), me.popup.params, {gubun : 'road' }  );
			store.load({
				params   : {param:JSON.stringify(param)},
				scope    : me,
				callback : function(records, operation, success) {
					me.down('#roadzip').getSelectionModel().select(0);
				}
			});

		} else if ( tindex == 1) {

			if ( !me.down('form').getValues().find_name ){
				resource.showError( '검색어를 입력해주시기 바랍니다.');
				return;
			}

			store =  me.down('#zipcode').getStore();
			param = Ext.merge( me.down('form').getValues(), me.popup.params, {gubun : 'zip' }  );
			store.load({
				params   : {param:JSON.stringify(param)},
				scope    : me,
				callback : function(records, operation, success) {
					me.down('#zipcode').getSelectionModel().select(0);
				}
			});

		}

	},
	 finishAction: function(){
		var  me    = this,
			 panel   = undefined, //me.down('grid'),
			 selects = undefined, //panel.getSelectionModel().getSelection(),
			 request = [],
			 tpanel  = me.down('#mainpanel'), //me.down('#mainpanel'), createForm
			 tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if ( tindex == 0 ){
			panel   =  tpanel.down('#roadzip') ;
			selects =  panel.getSelectionModel().getSelection() ;
		} else if ( tindex == 1 ) {
			panel   =  tpanel.down('#zipcode') ;
			selects =  panel.getSelectionModel().getSelection() ;
		}

		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				var store = Ext.create('Axt.popup.store.ZipcodeSearch' );
					param = Ext.merge( me.popup.params, {
						records : request
					});
					store.getProxy().api.read = me.popup.apiurl.master ;
					store.load({
						params   : {param:JSON.stringify(param)},
						scope    : me,
						callback : function(records, operation, success) {
							if (success) {
								me.setResponse(records);
							}
						}
					});
			} else {
				var select = selects[0];
				var zipcd = select.get('zip_id').substring(0,3) + "-" + select.get('zip_id').substring(3,6);

				select.set('zip_cd', zipcd );

				if ( select.get('zip_gb') == "0" ) { /* 이전주소 */

					if( select.get('bunji') ){
						select.set('addr_2', select.get('bunji') + " " + select.get('addr_2') );
					} else {

					}

				} else
				if ( select.get('zip_gb') == "1" ) { /* 도로주소 */
					if( select.get('bunji') ){
						select.set('dong', select.get('road_nm') + " " +  select.get('bunji') );
					} else {
						select.set('dong', select.get('road_nm') );
					}
				}
				me.setResponse(selects);
			}
		}
	}

});

