Ext.define('module.custom.iypkg.prod.workbookv1.view.WorkBookV1ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv1-detail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.iypkg.prod.workbookv1.store.WorkBookV1Detail',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
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
					{	text : '<span class="btnTemp" style="font-size:2.5em;">교대/마감</span>', cls : 'button-left btn btn-success' , width: 150, height : 50, margin: '0 0 0 5' , handler:me.shiftWork
					},{	text : '<span class="btnTemp" style="font-size:2.5em;">일마감</span>'    , cls : 'button-left btn btn-info'    , width: 150, height : 50, margin: '0 0 0 5', hidden : true
					},{	text : '<span class="btnTemp" style="font-size:2.5em;">불량/유실 보고</span>'  ,
						cls  : 'button-left btn btn-primary' ,
						width: 150,
						height : 50,
						margin : '0 0 0 5',
						handler:  function() {
							var detail    = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
								master    = Ext.ComponentQuery.query('module-workbookv1-lister')[0],
								select    = detail.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
							}else{
								me.iteminfo(select);
							}
						}
					},
					'->','-',
					{	text : '<span class="btnTemp" style="font-size:1.5em;">삭제</span>', cls : 'btn btn-danger ' , width: 100, height : 35, margin: '0 0 0 5' , handler:me.deleted
					}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width :80	, xtype  : 'lookupcolumn'	, lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'wkod_seqn'		, text : Language.get('wkod_seqn'		,'지시순번'	) , flex  : 2	, align  :'center'			, hidden:true
					},{ dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 125	, align  : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('acpt_numb'		,'수주번호'	) , width : 160	, align  : 'center', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'	) , width : 150 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width : 100	,
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 80	, xtype  : 'numericcolumn'
					},{ dataIndex: 'work_strt'		, text : Language.get('work_strt'		,'시작일'	) , width : 100	, align  : 'center'
					},{ dataIndex: 'work_endd'		, text : Language.get('work_endd'		,'종료일'	) , width : 75	, align  : 'center',hidden:true
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'	) , width : 75	, align  : 'center',hidden:true
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'	) , width : 85	, align  : 'center'			, hidden : true
//					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 100	, align  : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('work_numb'		,'작업번호'	) , width : 180	, hidden : true
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품명'		) , width : 200	, minWidth : 170
					},{ dataIndex: 'bxty_name'		, text : Language.get('bxty_name'		,'상자형식'	) , width : 150
					},{ dataIndex: 'prod_leng'		, text : Language.get('prod_name'		,'장'		) , width : 60
					},{ dataIndex: 'prod_widh'		, text : Language.get('prod_widh'		,'폭'		) , width : 60
					},{ dataIndex: 'prod_hght'		, text : Language.get('prod_hght'		,'고'		) , width : 60
					},{ dataIndex: 'prod_spec'		, text : Language.get('prod_spec'		,'규격'		) , flex  : 2	, hidden : true
					},{ dataIndex: 'wker_name'		, text : Language.get('wker'			,'관리자'		) , width : 100
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'		) , flex  : 2	, hidden : true
					},{ header: '실행',
						width : 220,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec,a,b,c) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:100,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">중단</span>',
										cls:'btn btn-warning btnTemp '+_global.options.work_book_tema+'button',
										handler:  function(){me.stop(rec)},
									});
									Ext.widget('button', {
										width:100,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">종료<span>',
										cls:'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
										handler:  function(){me.end(rec)},
									});
//									Ext.widget('button', {
//										width:100,
//										height: 40,
//										renderTo: Ext.query("#"+id)[0],
//										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">삭제</span>',
//										cls:'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
//										handler:  function(){me.deleted(rec)},
//									});
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
	//TODO 중단
	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore()
		;

		var	form = Ext.widget('form', {
				border: false,
				itemId: 'stop',
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 130,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_endd_date','중단일자'),
						name		: 'work_endd_date',
						xtype		: 'datefield',
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						maxValue	: new Date(),
						trigger1Cls : _global.options.work_book_tema+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date(),
						readOnly	: true
					},{	fieldLabel	: Language.get('work_edtm','중단시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						readOnly	: true,
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
						name		: 'prod_qntt',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						hideTrigger	: true,
						readOnly	: false,
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						handleMouseEvents:true,
						listeners:{
							render:function(field ){
								field.getEl().on('click', function( event, el ) {
									var trigger1 = Ext.dom.Query.select('.trigger1')[0];
									Ext.get(trigger1).dom.click();
								});
							}
						},
						popup: {
							select	: 'SINGLE',
							widget	: 'lookup-keypad-popup',
							params	: { stor_grp : _global.stor_grp},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].result);
							}
						},
						trigger1Cls : 'hideCls trigger1',
					},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'dsct_resn_dvcd',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 450,
						lookupValue	: resource.lookup('dsct_resn_dvcd'),
						height		: 50,
						margin		: '10 0 0 0',
						multiSelect	: false ,
						editable	: false,
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{ xtype		: 'datefield',
						name		: 'invc_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: rec.get('invc_date')
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
								sttm_temp1 = sttm_temp2.replace(/:/gi,""),
								sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
								sttm_hour = sttm_temp.substring('8','10');
								edtm_hour = param.work_edtm.substring('0','2');
								sttm_min = sttm_temp.substring('10','12');
								edtm_min = param.work_edtm.substring('2','4');
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: rec.get('invc_date'),
								work_edtm		: param.work_edtm+'00',
								prod_qntt		: param.prod_qntt,
								dsct_resn_dvcd	: param.dsct_resn_dvcd,
								need_time		: total,
								work_endd_date	: param.work_endd_date
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
//									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'stop'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							Ext.ComponentQuery.query('#stop')[0].up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">중단</span>',
				closeAction: 'destory',
				width: 559,
				height: 437,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();

	},
	//TODO 종료
	end : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-workbookv1-detail2')[0].getStore()
		;
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			itemId : 'end',
			fieldDefaults: {
				labelWidth: 200,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_endd_date','종료일자'),
					name		: 'work_endd_date',
					xtype		: 'datefield',
					width		: 535,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: new Date(),
					maxValue	: new Date(),
				},{	fieldLabel	: Language.get('work_edtm','종료시간'),
					name		: 'work_edtm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					value		: new Date(),
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					readOnly	: true,
					width		: 533,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp'
				},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'prod_qntt',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					width		: 548,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					trigger1Cls : _global.options.work_book_tema+'searchTrigger',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1')[0];
								Ext.get(trigger1).dom.click();
							});
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].result);
						}
					},
					trigger1Cls : 'hideCls trigger1',
				},{ xtype		: 'datefield',
					name		: 'invc_date',
					hidden		: true,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: rec.get('invc_date')
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
							sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
							sttm_temp1 = sttm_temp2.replace(/:/gi,""),
							sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
							sttm_hour = sttm_temp.substring('8','10');
							edtm_hour = param.work_edtm.substring('0','2');
							sttm_min = sttm_temp.substring('10','12');
							edtm_min = param.work_edtm.substring('2','4');
						if(param.prod_qntt==null||param.prod_qntt==''){
							Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
						}else{
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								pdsd_numb		: rec.get('pdsd_numb'),
								wkct_idcd		: rec.get('wkct_idcd'),
								work_sttm		: rec.get('work_sttm'),
								cvic_idcd		: rec.get('cvic_idcd'),
								work_edtm		: param.work_edtm+'00',
								prod_qntt		: param.prod_qntt,
								invc_date		: rec.get('invc_date'),
								work_endd_date	: param.work_endd_date,
								need_time		: total,
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();

//										this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'end'} );
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();

						Ext.ComponentQuery.query('#end')[0].up('window').destroy();
					}
				}
			]

		});

		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
			closeAction: 'destroy',
			width: 650,
			height: 360,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},
	//TODO 삭제
	deleted : function () {
		var search = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store  = Ext.ComponentQuery.query('module-workbookv1-detail2')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore(),
			store3 = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			detail = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
			rec = detail.getSelectionModel().getSelection()[0],
			length = detail.getSelectionModel().getSelection().length
		;
		if(rec){
			if(length > 1){
				Ext.Msg.alert("알림","삭제하려는 작업내역을 하나만 선택해주십시오.");
				return;
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				itemId:'delete',
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '삭제하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: param.invc_date,
								work_edtm		: '',
								need_time		: ''
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store3.reload();
									store2.reload();
									this.up('form').getForm().reset();
									Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'delete'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">삭제</span>',
				closeAction: 'destroy',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
		}else{
			Ext.Msg.alert("알림","삭제하려는 작업내역을 선택해주십시오.");
		}
	},
	//TODO 불량내역
	poor : function (rec) {
		var search     = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			store      = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore(),
			poorLookup = new Array(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'poor',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'불량유형과 불량수량을 입력하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 62'
				},{	fieldLabel	: Language.get('poor_name', ' '),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
					xtype		: 'textfield',
					name		: 'poor_name',
					width		: 413,
					height		: 50,
					maxWidth	: 500,
					readOnly	: true,
					labelWidth	: 210,
					margin		: '20 0 0 0'
				},{ xtype:'textfield', name : 'poor_bacd',hidden:true
				},{	fieldLabel	: Language.get('poor_qntt', '불량수량'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'poor_qntt',
					width		: 430,
					height		: 50,
					maxWidth	: 500,
					labelWidth	: 210,
					margin		: '20 0 0 0',
					listConfig	:{
						itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1')[0];
								Ext.get(trigger1).dom.click();
							});
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].result);
						}
					},
					trigger1Cls : 'hideCls trigger1',
				},{	xtype   : 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">흑점</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('01');
							poor_name.setValue('흑점');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">BURR</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('02');
							poor_name.setValue('BURR');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">GAS</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('03');
							poor_name.setValue('GAS');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">미성형</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('04');
							poor_name.setValue('미성형');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">웰드</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('05');
							poor_name.setValue('웰드');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">수축</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('06');
							poor_name.setValue('수축');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">CRACK</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('07');
							poor_name.setValue('CRACK');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2em;color:white;">스크래치(멍)</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('08');
							poor_name.setValue('스크래치(멍)');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">이물</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('09');
							poor_name.setValue('이물');
						}
					}
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">실바리</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('10');
							poor_name.setValue('실바리');
						}
					},
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">기름</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('11');
							poor_name.setValue('기름');
						}
					}
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">기타</span>',
					cls     : 'poorbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					listeners :{
						click : function(){
							var form		= this.up('form'),
								poor_bacd	= form.down('[name=poor_bacd]'),
								poor_name	= form.down('[name=poor_name]')
							;
							poor_bacd.setValue('12');
							poor_name.setValue('기타');
						}
					}
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						if(poor_bacd.getValue()){
							me.poorupdate(form.getValues());
						}else{
							return;
						}

//						this.up('form').getForm().reset();
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
//						this.up('window').destroy();
						win.destroy();
					}
				}
			]
		});

		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량내역</span>',
			closeAction	: '',
			width		: 581,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
	},
	//TODO 유실보고
	fail : function (rec) {
		var search     = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			store      = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'fail',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'유실 유형과 유실 시간을 입력하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 89'
				},{	fieldLabel	: Language.get('loss_resn_name', ' '),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
					xtype		: 'textfield',
					name		: 'loss_resn_name',
					width		: 419,
					labelWidth	: 130,
					height		: 50,
					maxWidth	: 500,
					readOnly	: true,
					margin		: '20 0 0 0'
				},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 60,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							margin		: '0 0 0 70',
							readOnly	: false,
							width		: 180,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						},{	fieldLabel	: Language.get('','~'),
							name		: 'edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							margin		: '0 0 0 10',
							labelWidth	: 15,
							value		: '',
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							readOnly	: false,
							margin		: '0 0 0 50',
							width		: 135,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						}
					]
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">계획정지</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('01');
							loss_resn_name.setValue('계획정지');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">일시정지</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('02');
							loss_resn_name.setValue('일시정지');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:1.7em;color:white;">원재료 교환</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('03');
							loss_resn_name.setValue('원재료 교환');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">승인대기</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('04');
							loss_resn_name.setValue('승인대기');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형교환</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('05');
							loss_resn_name.setValue('금형교환');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형이상</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('06');
							loss_resn_name.setValue('금형이상');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20',
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">사출기고장</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('07');
							loss_resn_name.setValue('사출기고장');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30',
					hidden:true
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">로보트고장</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('08');
							loss_resn_name.setValue('로보트고장');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타설비고장</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('09');
							loss_resn_name.setValue('기타설비고장');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 20'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">시사출</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('10');
							loss_resn_name.setValue('시사출');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 30 30'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">샘플</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('11');
							loss_resn_name.setValue('샘플');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 30 20'
				},{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타(인원등)</span>',
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue('12');
							loss_resn_name.setValue('기타(인원등)');
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 30 20'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form			= this.up('form'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
							loss_resn_name	= form.down('[name=loss_resn_name]')
						;
						if(loss_resn_dvcd){
							me.failupdate(form.getValues());
						}else{
							return;
						}
//						form.getForm().reset();
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						win.destroy();
//						Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					}
				}
			]
		});

		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
			closeAction	: 'destory',
			width		: 586,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
	},
	//TODO 불량 업로드 function
	poorupdate : function (param) {
		var me = this,
			poor_qntt = param.poor_qntt,
			poor_bacd = param.poor_bacd,
			detail    = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
			poor      = Ext.ComponentQuery.query('module-workbookv1-poor')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			sttm1      = select.get('work_sttm'),
			edtm1      = select.get('work_edtm'),
			sttm       = null,
			edtm       = ''
		;
		if(poor_bacd==''||poor_bacd==null){
			Ext.Msg.alert("알림","불량유형을 반드시 선택하여 주십시오.");
		}
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			if(sttm1!=null||sttm1!=undefined){
				sttm = sttm1.replace(':','');
			}
			if(edtm1!=null||edtm1!=undefined){
				edtm = edtm1.replace(':','');
			}
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv5/get/poorseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv5/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						poor_bacd		: poor_bacd,
						sttm			: sttm,
						edtm			: edtm,
						wker_idcd		: select.get('wker_idcd'),
						good_qntt		: null,
						poor_qntt		: poor_qntt,
						loss_qntt		: null,
						runn_dsct_yorn	: null
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
					poor.getStore().reload();
				}
			});
		}
	},
	//TODO 유실보고 업로드 function
	failupdate : function (param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			loss_resn_dvcd     = param.loss_resn_dvcd,
			sttm      = sttm1.replace(':',''),
			edtm      = '',
			detail    = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
			fail      = Ext.ComponentQuery.query('module-workbookv1-fail')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0,
			sttm_hour = sttm.substring(0,2),
			sttm_min  = sttm.substring(2,4),
			edtm_hour  = '';
			edtm_min  = '',
			time = 0,
			min  = 0
		;
		if(edtm1){
			edtm		= edtm1.replace(':','')+"00";
			edtm_hour	= edtm.substring(0,2);
			edtm_min	= edtm.substring(2,4)
			time		= edtm_hour-sttm_hour;
			min			= edtm_min-sttm_min
		}
		if(loss_resn_dvcd==null||loss_resn_dvcd==''){
			Ext.Msg.alert("알림","유실유형을 선택하여주십시오.");
			return;
		}
		if(sttm1==null||sttm1==''){
			Ext.Msg.alert("알림","시간을 다시 입력하여주십시오.");
			return;
		}else{
			if(min < 0){
				time = edtm_hour-sttm_hour-1;
				min  = edtm_min-sttm_min + 60;
			}
			var total = (time*60)+min;
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv5/get/failseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv5/set/fail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						wkct_idcd		: select.get('wkct_idcd'),
						loss_resn_dvcd	: loss_resn_dvcd,
						sttm			: sttm+'00',
						edtm			: edtm,
						loss_time		: total,
						loss_pcnt		: 0,
						loss_mnhr		: 0,
						work_dsct_yorn	: 0,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					fail.getStore().reload();
				}
			});
		}
	},
//TODO 제품정보
	iteminfo : function (select) {
		var search     = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			poor       = Ext.ComponentQuery.query('module-workbookv1-poor')[0],
			store      = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-workbookv1-detail')[0].getStore(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'info',
			layout         : 'border',
			bodyPadding    : 5,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0', region:'north',
					items	: [
						{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
							xtype : 'button',
							handler:  function(){
								var detail    = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
									select    = detail.getSelectionModel().getSelection()[0]
								;
								if(!select){
									Ext.Msg.alert("알림","불량을 등록할 내역을 선택하여주십시오.");
								}else{
									me.poor()
								}
							},
							cls: 'button-left btn btn-danger',
							width: 150,
							height: 50,
							margin: '0 0 0 237'
						},{	text : '<span class="btnTemp" style="font-size:2.5em;">유실보고</span>'  ,
							xtype : 'button',
							handler:  function(){
								var detail    = Ext.ComponentQuery.query('module-workbookv1-detail')[0],
									select    = detail.getSelectionModel().getSelection()[0]
								;
								if(!select){
									Ext.Msg.alert("알림","유실 보고할 내역을 선택하여주십시오.");
								}else{
									me.fail()
								}
							},
							cls: 'button-left btn btn-warning',
							width: 150,
							height: 50,
							margin: '0 0 0 446'
						}
					]
				},{	xtype : 'module-workbookv1-poor', region:'west' , flex : 1, height:200 ,margin: '0 0 0 17'
				},{	xtype : 'module-workbookv1-fail',region:'center', flex : 1, height:200 ,margin: '0 17 0 0'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">닫기</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						Ext.ComponentQuery.query('#info')[0].up('window').destroy();
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">불량/유실 보고</span>',
			closeAction	: 'destory',
			width		: 1249,
			height		: 844,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
	},
	//TODO 근무조교대
	shiftWork : function(){
		var me			= this,
			search		= Ext.ComponentQuery.query('module-workbookv1-search')[0],
			searchDate	= search.down('[name=work_date]').getValue(),
			wkct_idcd	= search.down('[name=wkct_name]').getValue(),
			lister		= Ext.ComponentQuery.query('module-workbookv1-lister')[0],
			detail		= Ext.ComponentQuery.query('module-workbookv1-detail')[0],
			store		= lister.getStore(),
			store2		= detail.getStore(),
			select		= detail.getSelectionModel().getSelection()[0],
			dayshift	= new Date(new Date().setHours(08,00,0,0)),
			nightshift	= new Date(new Date().setHours(20,00,0,0)),
			shiftvalue,chekdayn
		;
		if(select){
			if(select.get('dayn_dvcd')==2){
				shiftvalue = dayshift;
				chekdayn = '1';
			}else{
				shiftvalue = nightshift;
				chekdayn = '2';
			}
			var form	= Ext.widget('form', {
				border	:false,
				layout	: 'vbox',
				items	: [
					{	border: false,
						itemId: 'shift',
	//					title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">전 근무조</span>',
						bodyPadding: '0 0 0 10',
						width: 500,
						fieldDefaults  : {
							labelWidth : 130,
							labelStyle : 'text-align:right',
							labelSeparator : '',
						},
						items:[
							{	fieldLabel	: Language.get('work_endd_date','마감일자'),
								name		: 'work_endd_date',
								xtype		: 'datefield',
								width		: 435,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								maxValue	: new Date(),
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: searchDate,
								readOnly	: true,
								margin		: '20 0 0 0',
								labelSeparator : '',
							},{	fieldLabel	: Language.get('work_edtm','마감시간'),
								name		: 'work_edtm',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								margin		: '10 0 0 0',
								hideTrigger	: true,
								value		: shiftvalue,
								readOnly	: true,
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								width		: 435,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
								name		: 'prod_qntt',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								hideTrigger	: true,
								readOnly	: false,
								width		: 435,
								height		: 40,
								margin		: '10 0 10 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.trigger1')[0];
											Ext.get(trigger1).dom.click();
										});
									}
								},
								popup: {
									select	: 'SINGLE',
									widget	: 'lookup-keypad-popup',
									params	: { stor_grp : _global.stor_grp},
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].result);
									}
								},
								trigger1Cls : 'hideCls trigger1',
								labelSeparator : '',
							},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
								xtype		: 'lookupfield',
								name		: 'dsct_resn_dvcd',
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
								width		: 395,
								margin		: '10 0 10 0',
								lookupValue	: resource.lookup('dsct_resn_dvcd'),
								height		: 40,
								multiSelect	: false ,
								editable	: false,
								hidden		: true,
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('dayn_dvcd2', '마감조'),xtype		: 'lookupfield',
								lookupValue	: resource.lookup('dayn_dvcd'),
								name		: 'dayn_dvcd2',
								hidden		: false,
								width		: 435,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
								value		: select.get('dayn_dvcd'),
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								readOnly	: true,
								labelSeparator : '',
							}

						]
					},{	border: false,
						bodyPadding: 10,
						width: 500,
						title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">교대시작</span>',
						fieldDefaults: {
							labelWidth: 140,
							labelStyle: 'text-align:right',
							labelSeparator : '',
						},
						items:[
							{	fieldLabel	: Language.get('shft_date','교대일자'),
								name		: 'invc_date',
								xtype		: 'datefield',
								value		: searchDate,
								width		: 435,
								height		: 40,
								readOnly	: true,
								margin		: '20 0 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								maxValue	: new Date(),
								labelSeparator : '',
							},{	fieldLabel	: Language.get('shft_time','교대시간'),
								name		: 'work_sttm',
								xtype		: 'timefield',
								format		: 'H:i',
								margin		: '10 0 0 0',
								submitFormat: 'Hi',
								hideTrigger	: true,
								readOnly	: true,
								value		: shiftvalue,
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								width		: 435,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								labelSeparator : '',
							},{	fieldLabel	: Language.get('wker_name','관리자'),
								value		: '',
								width		: 395,
								height		: 40,
								margin		: '10 0 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wker_name',
								pair		: 'wker_idcd',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workbookv1-user-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
								labelSeparator : '',
							},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('dayn_dvcd', '시작조'),xtype		: 'lookupfield',
								lookupValue	: resource.lookup('dayn_dvcd'),
								name		: 'dayn_dvcd',
								margin		: '10 0 0 0',
								hidden		: false,
								width		: 435,
								height		: 40,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
								value		: chekdayn,
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								readOnly	: true,
								labelSeparator : '',
							}
						],
						buttons: [
							{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
								cls: 'button-style',
								flex:1,
								height:50,
								handler: function() {
									var param = Ext.merge(form.getValues() );
										sttm_temp2 = select.get('work_strt_dttm').replace(/-/gi,""),
										sttm_temp1 = sttm_temp2.replace(/:/gi,""),
										sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
										sttm_hour = sttm_temp.substring('8','10');
										edtm_hour = param.work_edtm.substring('0','2');
										sttm_min = sttm_temp.substring('10','12');
										edtm_min = param.work_edtm.substring('2','4');
									var time = 0;
									var min   = edtm_min-sttm_min;
									if(param.dayn_dvcd==1){
										time  = (24+Number(edtm_hour)) - Number(sttm_hour);
									}else{
										time  = edtm_hour-sttm_hour;
									}
									if(min < 0){
										time = time-1;
										min  = edtm_min-sttm_min + 60;
									}
									var total = (time*60)+min;
									if(!param.prod_qntt ||param.prod_qntt <= 0){
										Ext.Msg.alert("알림","생산수량을 입력해주세요.");
										return;
//									}else if(!param.wker_name){
//										Ext.Msg.alert("알림","작업자를 선택해주세요.");
//										return;
									}
									record = Ext.create( store2.model.modelName , {
										invc_numb		: select.get('invc_numb'),
										wkod_numb		: select.get('wkod_numb'),
										wkod_seqn		: select.get('wkod_seqn'),
										wkct_idcd		: select.get('wkct_idcd'),
										pdsd_numb		: select.get('pdsd_numb'),
										work_sttm		: select.get('work_sttm'),
										item_idcd		: select.get('item_idcd'),
										cvic_idcd		: select.get('cvic_idcd'),
										work_edtm		: param.work_edtm+'00',
										invc_date		: select.get('invc_date'),
										prod_qntt		: param.prod_qntt,
										dsct_resn_dvcd	: param.dsct_resn_dvcd,
										need_time		: total,
										work_endd_date	: param.work_endd_date,
//										dayn_dvcd		: param.dayn_dvcd
									});
									store2.add(record);
									store2.sync({
										callback: function(batch, options) {

										} ,
										scope: this
									},{	synchro : _global.objects.synchro,_set : 'stop'} );
									store2.clearData();
									store2.loadData([],false);
									store2.reload();
									var new_invc_numb;
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
												new_invc_numb = result.records[0].seq;
											}
										},
										failure : function(result, request) {
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									});
									record = Ext.create( store2.model.modelName , {
										invc_numb		: new_invc_numb,
										indn_qntt		: select.get('indn_qntt'),
										pdsd_numb		: select.get('pdsd_numb'),
										wkod_numb		: select.get('wkod_numb'),
										wkod_seqn		: select.get('wkod_seqn'),
										item_idcd		: select.get('item_idcd'),
										invc_date		: param.invc_date,
										wker_idcd		: param.wker_idcd,
										dayn_dvcd		: param.dayn_dvcd,
										work_sttm		: param.work_sttm+'00',
										wkct_idcd		: select.get('wkct_idcd'),
										mold_idcd		: select.get('mold_idcd'),
										mtrl_bacd		: select.get('mtrl_bacd'),
										lott_numb		: select.get('lott_numb'),
									});
									store2.add(record);
									store2.sync({
										callback: function(batch, options) {
											store.reload();
											store2.reload();
											this.up('form').getForm().reset();
											this.up('window').destroy();
										} ,
										scope: this
									},{	synchro : _global.objects.synchro,_set : 'insert'} );
								}
							},
							{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
								cls: 'button-style',
								flex:1,
								height:50,
								handler: function() {
//									form.getForm().reset();

									Ext.ComponentQuery.query('#shift')[0].up('window').destroy();
								}
							}
						]
					}
				]
			});
			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">교대마감</span>',
				closeAction: 'destory',
				width: 510,
				height: 600,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
		}else{
			Ext.Msg.alert("알림","근무교대할 작업을 선택해주십시오.");
		}
	},
});