Ext.define('module.prod.order.workbookv4.view.WorkBookV4ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv4-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.prod.order.workbookv4.store.WorkBookV4',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},
	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:2.5em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get(''				,'상태'		) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'seqn'			, text : Language.get(''				,'순번'		) , width : 45  , align : 'center'
					},{ dataIndex: 'work_strt'		, text : Language.get(''				,'시작예정'	) , width : 100 , align : 'center'
					},{ dataIndex: 'work_endd'		, text : Language.get(''				,'종료예정'	) , width : 100 , align : 'center'
					},{ dataIndex: 'acpt_numb'		, text : Language.get(''				,'수주번호'	) , width : 155 , align : 'center',hidden:true
					},{ dataIndex: 'lott_numb'		, text : Language.get(''				,'LOT번호'	) , width : 100 , align : 'center'
					},{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드'	) , width : 80  , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get(''				,'품목코드'	) , width : 125 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex  : 1
					},{ dataIndex: 'mtrl_name'		, text : Language.get(''				,'재질'		) , width : 95  , align : 'center'
					},{ dataIndex: 'pckg_cotr_name'	, text : Language.get(''				,'포장용기'	) , width : 95  , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get(''				,'지시수량'	) , width : 95  , xtype : 'numericcolumn'
					},{ dataIndex: 'acum_qntt'		, text : Language.get(''				,'누적수량'	) , width : 95  , xtype : 'numericcolumn'
					},{ dataIndex: 'subs_qntt'		, text : Language.get(''				,'잔량'		) , width : 95  , xtype : 'numericcolumn',
						renderer:function(val,field,records){
							var value = records.get('indn_qntt')-records.get('acum_qntt');
							return Ext.util.Format.number(value, '0,000');
						}
					},{ dataIndex: 'invc_numb'		, text : Language.get(''				,'지시번호'	) , width : 220 , align : 'center'	, hidden : true
					},{ dataIndex: 'pdod_date'		, text : Language.get(''				,'지시일자'	) , flex  : 2   , align : 'center'	, hidden : true
					},{ dataIndex: 'item_spec'		, text : Language.get(''				,'규격'		) , flex  : 2   , hidden: true
					},{ dataIndex: 'work_date'		, text : Language.get(''				,'작업일자'	) , flex  : 2   , hidden: true
					},{ dataIndex: 'cvic_idcd'		, text : Language.get(''				,'설비ID'	) , flex  : 2   , hidden: true
					},{ dataIndex: 'line_seqn'		, text : Language.get(''				,'순번'		) , width : 60  , hidden: true
					},{ header: '실행',
						sortable: false,
						width:90,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width:80,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">시작</span>',
										cls:'btn btn-primary btnTemp '+_global.hq_id+'button',
										handler: function(){me.insert(rec)}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	//TODO 시작
	insert : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv4-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv4-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workbookv4-detail')[0].getStore(),
			invc_date,dayn_dvcd,invc_numb,work_sttm,chk=0
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv4/get/pause.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					wkod_numb	: rec.get('invc_numb'),
					cvic_idcd	: rec.get('cvic_idcd')
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
					if(result.records[0]){
						dayn_dvcd = result.records[0].dayn_dvcd;
						invc_numb = result.records[0].invc_numb;
						invc_date = result.records[0].invc_date;

						work_sttm = new Date(result.records[0].work_sttm);
					}else{
						chk = 1
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(chk){
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'work_book'
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
						invc_numb = result.records[0].seq;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			invc_date = searchDate;
			dayn_dvcd = '';
			work_sttm = new Date();
		}
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 150,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_date','작업일자'),
					name		: 'invc_date',
					xtype		: 'datefield',
					value		: searchDate,
					width		: 435,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp',
					trigger1Cls : _global.hq_id+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					maxValue	: new Date(),
				},{	fieldLabel	: Language.get('work_sttm','시작시간'),
					name		: 'work_sttm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					readOnly	: true,
					value		: work_sttm,
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 433,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('wker_name','작업관리자'),
					value		: '',
					width		: 450,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'wker_name',
					pair		: 'wker_idcd',
					trigger1Cls : _global.hq_id+'searchTrigger',
					clearable	: false ,
					popup: {
						select : 'SINGLE',
						widget : 'lookup-workbookv4-user-popup',
						params : { stor_grp : _global.stor_grp , row_sts : '0'},
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('user_name'));
							pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
				},{	fieldLabel	: Language.get('dayn_dvcd', '주/야 구분'),
					labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
					xtype		: 'lookupfield',
					name		: 'dayn_dvcd',
					trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
					width		: 450,
					value		: dayn_dvcd,
					lookupValue	: resource.lookup('dayn_dvcd'),
					height		: 50,
					margin		: '15 0 0 0',
					multiSelect	: false ,
					editable	: false,
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
//				},{	fieldLabel	: Language.get('cvic_name','설비'),
//					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
//					name		: 'cvic_name',
//					pair		: 'cvic_idcd',
//					value		: '',
//					labelCls	: 'textTemp '+_global.hq_id+'label',
//					fieldCls	: 'textTemp '+_global.hq_id+'field',
//					cls			: 'textTemp',
//					width		: 550,
//					height		: 50,
//					labelStyle	: 'line-height: 75px;',
//					trigger1Cls : _global.hq_id+'searchTrigger',
//					popup: {
//						select : 'SINGLE',
//						widget : 'lookup-workbookv4-cvic-popup',
//						params : { stor_grp : _global.stor_grp , row_sts : '0'},
//						result : function(records, nameField, pairField) {
//							nameField.setValue(records[0].get('cvic_name'));
//							pairField.setValue(records[0].get('cvic_idcd'));
//						}
//					}
//				},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
						if(param.invc_date==null || param.invc_date ==''){
							Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
						}else if(param.work_sttm==null || param.work_sttm ==''){
							Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
						}else if(param.wker_idcd==null || param.wker_idcd ==''){			// 이전 두인 요청으로 주석처리되어있었음 주석해제함 (2020 10 15 장우영)
							Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
						}else if(param.dayn_dvcd==null || param.dayn_dvcd ==''){
							Ext.Msg.alert("알림","주/야 구분을 반드시 입력해주십시오.");
						}else{
							record = Ext.create( store.model.modelName , {
								invc_numb		: invc_numb,
								indn_qntt		: rec.get('indn_qntt'),
								pdsd_numb		: rec.get('pdsd_numb'),
								wkod_numb		: rec.get('invc_numb'),
								wkod_seqn		: rec.get('line_seqn'),
								item_idcd		: rec.get('wkct_item_idcd'),
								invc_date		: param.invc_date,
								wker_idcd		: param.wker_idcd,
								dayn_dvcd		: param.dayn_dvcd,
								work_sttm		: param.work_sttm+'00',
								cvic_idcd		: rec.get('cvic_idcd'),
								mold_idcd		: rec.get('mold_idcd'),
								mtrl_bacd		: rec.get('mtrl_bacd'),
								lott_numb		: rec.get('lott_numb'),
								prog_stat_dvcd	: rec.get('prog_stat_dvcd'),
								cavity			: rec.get('cavity'),
								cycl_time		: rec.get('cycl_time'),
								sysm_memo		: rec.get('seqn')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'insert'} );
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
			closeAction: 'hide',
			width: 580,
			height: 430,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},

});