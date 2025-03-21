Ext.define('module.prod.order.workbookv3.view.WorkBookV3ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv3-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workbookv3.store.WorkBookV3',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll.
    }],
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
				pagingButton : false,
				items	: [
					'->',
					{	text : '<span class="btnTemp" style="font-size:2.5em;">불량/유실 보고</span>'  ,
						cls  : 'button-left btn btn-primary' ,
						width: 210,
						height : 50,
						margin : '0 0 0 5',
						handler:  function() {
							var master    = me,
								select    = me.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
							}else{
								if(select.get('prog_stat_dvcd')>0){
									me.iteminfo(select);
								}else{
									Ext.Msg.alert("알림","작업 시작 후 불량/유실보고 할 수 있습니다.");
								}
							}
						}
					}
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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width :80  , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","착수"],["2","중단"],["3","완료"]], align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('pdsd_numb'		,'작업지시번호') , width : 200 , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 200 , align : 'center',hidden : true
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 125 , align : 'center'	, hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex  : 1
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 220  , align : 'left'
//					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'		) , width : 95  , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 90  , xtype : 'numericcolumn'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('total_qntt'		,'누적수량'	) , width : 90  , xtype : 'numericcolumn'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 220 , align : 'center'	, hidden : true
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , flex  : 2   , align : 'center'	, hidden : true
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex  : 2   , hidden: true
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'	) , flex  : 2   , hidden: true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 60  , hidden: true
					},{ header: '실행',
						sortable: false,
						width:350,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									width:100,
									height: 40,
									margin: "0 10px 0 0",
									text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">시작</span>',
									cls:'btn btn-success btnTemp '+_global.hq_id+'button',
									handler: function(){
										var store = me.getStore();
										var new_invc_numb;
										if(rec.get('work_numb')==""||rec.get('prog_stat_dvcd')==2){
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
											record = Ext.create( store.model.modelName , {
												invc_numb		: new_invc_numb,
												indn_qntt		: rec.get('indn_qntt'),
												pdsd_numb		: rec.get('pdsd_numb'),
												wkod_numb		: rec.get('invc_numb'),
												wkod_seqn		: rec.get('line_seqn'),
												item_idcd		: rec.get('wkct_item_idcd'),
												invc_date		: Ext.Date.format(new Date(),'Ymd'),
												wker_idcd		: _global.login_pk,
												work_sttm		: Ext.Date.format(new Date(),'His'),
												wkct_idcd		: rec.get('wkct_idcd'),
												mold_idcd		: rec.get('mold_idcd'),
												mtrl_bacd		: rec.get('mtrl_bacd'),
												lott_numb		: rec.get('lott_numb'),
												last_wkct_yorn	: rec.get('last_wkct_yorn')
											});
											store.add(record);
											store.sync({
												callback: function(batch, options) {
													store.reload();
												} ,
												scope: this
											},{	synchro : _global.objects.synchro,_set : 'insert'} );
//											me.insert(rec);
										}
									}
								});
								Ext.widget('button', {
									width:100,
									height: 40,
									margin: "0 10px 0 0",
									renderTo: Ext.query("#"+id)[0],
									text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">중단</span>',
									cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
									handler:  function(){
										if(rec.get('work_numb')!=""&&rec.get('prog_stat_dvcd')==1){
											me.stop(rec)
										}
									},
								});
								Ext.widget('button', {
									width:100,
									height: 40,
									renderTo: Ext.query("#"+id)[0],
									text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">종료<span>',
									cls:'btn btn-danger btnTemp '+_global.hq_id+'button',
									handler:  function(){
										if(rec.get('work_numb')!=""&&rec.get('prog_stat_dvcd')==1){
											me.end(rec)
										}
									},
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
	insert : function (rec) {
		var me = this;
		var search = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = me.getStore()
		;
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
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					trigger1Cls : _global.hq_id+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					maxValue	: new Date(),
					listeners:{
					}
				},{	fieldLabel	: Language.get('work_sttm','시작시간'),
					name		: 'work_sttm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					readOnly	: true,
					value		: new Date(),
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 433,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('dayn_dvcd', '주/야 구분'),
					labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
					xtype		: 'lookupfield',
					name		: 'dayn_dvcd',
					trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
					width		: 450,
					lookupValue	: resource.lookup('dayn_dvcd'),
					height		: 50,
					margin		: '15 0 0 0',
					multiSelect	: false ,
					editable	: false,
					value		: '1',
					listConfig:{
						itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
					},
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
						}else if(param.dayn_dvcd==null || param.dayn_dvcd ==''){
							Ext.Msg.alert("알림","주/야 구분을 반드시 입력해주십시오.");
						}else{
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
							record = Ext.create( store.model.modelName , {
								invc_numb		: new_invc_numb,
								indn_qntt		: rec.get('indn_qntt'),
								pdsd_numb		: rec.get('pdsd_numb'),
								wkod_numb		: rec.get('invc_numb'),
								wkod_seqn		: rec.get('line_seqn'),
								item_idcd		: rec.get('wkct_item_idcd'),
								invc_date		: param.invc_date,
								dayn_dvcd		: param.dayn_dvcd,
								work_sttm		: param.work_sttm+'00',
								wkct_idcd		: rec.get('wkct_idcd'),
								mold_idcd		: rec.get('mold_idcd'),
								mtrl_bacd		: rec.get('mtrl_bacd'),
								lott_numb		: rec.get('lott_numb'),
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
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
	},
	stop : function (rec) {
		var me         = this,
			search     = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd  = search.down('[name=wkct_name]').getValue(),
			store      = me.getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 130,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						maxValue	: new Date(),
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
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
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
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
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						handleMouseEvents:true,
						value		: ((rec.get('indn_qntt')>0?rec.get('indn_qntt'):0)-(rec.get('prod_qntt')>0?rec.get('prod_qntt'):0)),
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
								console.log(records[0]);
								nameField.setValue(records[0].result);
							}
						},
						trigger1Cls : 'hideCls trigger1',
					},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
						labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'dsct_resn_dvcd',
						trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 450,
						lookupValue	: resource.lookup('dsct_resn_dvcd'),
						height		: 50,
						margin		: '10 0 0 0',
						multiSelect	: false ,
						editable	: false,
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
					},{ xtype		: 'datefield',
						name		: 'work_endd_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date()
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp2 = rec.get('strt_dttm').replace(/-/gi,""),
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
								invc_numb		: rec.get('work_numb'),
								wkod_numb		: rec.get('invc_numb'),
								wkod_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								pdsd_numb		: rec.get('invc_numb'),
								work_edtm		: param.work_edtm+'00',
								invc_date		: param.invc_date,
								prod_qntt		: param.prod_qntt,
								dsct_resn_dvcd	: param.dsct_resn_dvcd,
								need_time		: total,
								work_endd_date	: param.work_date
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
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
							this.up('window').destroy();
//							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">중단</span>',
				closeAction: 'hide',
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
	end : function (rec) {
		var me         = this
			search     = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd  = search.down('[name=wkct_name]').getValue(),
			store      = me.getStore(),
//			master = me.pocket.listermaster1(),
//			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = 'NboltBarcode.jrf',
			jrf2 = 'NboltInspCheck.jrf',
			jrf3 = 'NboltInspCheck2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var me = this;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						width		: 535,
						height		: 50,
						readOnly	: true,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
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
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp'
					},{ xtype		: 'datefield',
						name		: 'work_endd_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date()
					},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'prod_qntt',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						hideTrigger	: true,
						readOnly	: false,
						value		: ((rec.get('indn_qntt')>0?rec.get('indn_qntt'):0)-(rec.get('prod_qntt')>0?rec.get('prod_qntt'):0)),
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : 'hideCls trigger1',
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
					},{	fieldLabel	: Language.get('wker_name','작업자'),
						value		: '',
						width		: 490,
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
						hidden		: Boolean(wkct_idcd != 'M005'),
						trigger1Cls : _global.hq_id+'searchTrigger',
						clearable	: false ,
						value		: _global.login_nm,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-workbookv3-user-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true , value	: _global.login_pk
					},{	fieldLabel	: Language.get('dayn_dvcd', '주/야 구분'),
						labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'dayn_dvcd',
						trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 490,
						lookupValue	: resource.lookup('dayn_dvcd'),
						height		: 50,
						margin		: '15 0 20 0',
						hidden		: Boolean(wkct_idcd != 'M005'),
						multiSelect	: false ,
						editable	: false,
						value		: '1',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						}
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">검사항목 입력</span>',
						cls			: 'button-right btn btn-danger',
						width		: 300,
						height		: 46,
						margin		: '0 0 0 190',
						hidden		: Boolean(wkct_idcd != 'M005'),
						style: 'text-decoration:none;',
						handler:function(){
							//검사항목입력
							me.insp(rec);
						}
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">바코드 발행</span>',
						cls			: 'button-right btn btn-danger',
						width		: 300,
						height		: 46,
						margin		: '0 0 0 205',
						hidden		: Boolean(wkct_idcd != 'M011'),
						style: 'text-decoration:none;',
						handler:function(){
							//검사항목입력
							me.print(rec);
						}
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">검사성적서 발행</span>',
						cls			: 'button-right btn btn-danger',
						width		: 300,
						height		: 46,
						margin		: '20 0 0 205',
						hidden		: Boolean(wkct_idcd != 'M011'),
						style: 'text-decoration:none;',
						handler:function(){
							//검사항목입력
							me.print2(rec);
						}
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">납품검사성적서 발행</span>',
						cls			: 'button-right btn btn-danger',
						width		: 300,
						height		: 46,
						margin		: '20 0 0 205',
						hidden		: Boolean(wkct_idcd != 'M011'),
						style: 'text-decoration:none;',
						handler:function(){
							//검사항목입력
							me.print3(rec);
						}
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp2 = rec.get('strt_dttm').replace(/-/gi,""),
								sttm_temp1 = sttm_temp2.replace(/:/gi,""),
								sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
								sttm_hour = sttm_temp.substring('8','10');
								edtm_hour = param.work_edtm.substring('0','2');
								sttm_min = sttm_temp.substring('10','12');
								edtm_min = param.work_edtm.substring('2','4');
							if(param.prod_qntt==null||param.prod_qntt==''){
								Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
								return
//							}else if(param.wker_idcd==null || param.wker_idcd ==''){
//								Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
							}else{
								var time  = edtm_hour-sttm_hour;
								var min   = edtm_min-sttm_min;
								if(min < 0){
									time = edtm_hour-sttm_hour-1;
									min  = edtm_min-sttm_min + 60;
								}
								var total = (time*60)+min;
								record = Ext.create( store.model.modelName , {
									invc_numb		: rec.get('work_numb'),
									wkod_numb		: rec.get('invc_numb'),
									wkod_seqn		: rec.get('line_seqn'),
									item_idcd		: rec.get('item_idcd'),
									indn_qntt		: rec.get('indn_qntt'),
									pdsd_numb		: rec.get('invc_numb'),
									wkct_idcd		: rec.get('wkct_idcd'),
									work_edtm		: param.work_edtm+'00',
									invc_date		: param.invc_date,
									prod_qntt		: param.prod_qntt,
									need_time		: total,
									invc_date		: param.invc_date,
									wker_idcd		: param.wker_idcd,
									dayn_dvcd		: param.dayn_dvcd,
									pitch			: rec.get('pitch'),
									lead_angl		: rec.get('lead_angl'),
									h_valu			: rec.get('h_valu'),
									a_valu			: rec.get('a_valu'),
									b_valu			: rec.get('b_valu'),
									tick_valu		: rec.get('tick_valu'),
									widh_valu		: rec.get('widh_valu'),
									long_valu		: rec.get('long_valu')
								});
								store.add(record);
								if(wkct_idcd == 'M005'){
									if(rec.get('pitch') == '0' || rec.get('lead_angl') =='' || rec.get('h_valu') == '0' ||
											rec.get('a_valu') == '0' || rec.get('b_valu') == '0' || rec.get('tick_valu') == '0' || rec.get('widh_valu') == '0'
										|| rec.get('long_valu') == '0'){
										Ext.Msg.alert("알림","검사항목을 입력하여 주십시오.");
										return;
									}
								}
								store.sync({
									callback: function(batch, options) {
										store.reload();
										this.up('form').getForm().reset();
										this.up('window').destroy();
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
							this.up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
				closeAction: 'hide',
				width: 650,
				height: wkct_idcd == 'M005'?590:360 && wkct_idcd == 'M011'?555:360,
				layout: 'fit',
				resizable: true,
				modal: true,
				closable: false,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},

	print : function(rec){
		if(wkct_idcd == 'M011'){
			var invc_numb = rec.get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	print2 : function(rec){
		if(wkct_idcd == 'M011'){
			var invc_numb = rec.get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	print3 : function(rec){
		if(wkct_idcd == 'M011'){
			var invc_numb = rec.get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf3+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	//공정검사입력
	insp : function(rec){
		var me = this;
		var array;
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv3/get/desc.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					item_idcd	: rec.get('item_idcd'),
					invc_numb2	: rec.get('invc_numb')
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
					array = result.records;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
//		console.log('array', array[0]);
		console.log(rec);
		var lead_angl1, lead_angl2;
		lead_angl1 = array[0].lead_angl1?array[0].lead_angl1.split('도')[0]:'';
		lead_angl2 = array[0].lead_angl1?array[0].lead_angl1.split('도')[1].split('분')[0]:'';

		var store = me.getStore();
		var	form = Ext.widget('form', {
			border: false,
			itemId: 'insp',
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 120,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'Pitch',
							name		: 'pitch1',
							xtype		: 'textfield',
							value		: array[0].pitch1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'pitch',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].pitch1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger2',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger2')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: '리드각',
							name		: 'lead_angl1',
							xtype		: 'textfield',
							value		: array[0].lead_angl1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'lead_angl2',
							xtype		: 'popupfield',
							width		: 115,
							height		: 50,
							value		: lead_angl1,
							margin		: '3 0 0 10',
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger3',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger3')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						},{	xtype		: 'label',
							text		: '도',
							margin		: '8 0 0 5',
							style		: 'text-align:left; font-size: 2.3em !important;',
						},{	name		: 'lead_angl3',
							xtype		: 'popupfield',
							width		: 115,
							height		: 50,
							margin		: '3 0 0 10',
							value		: lead_angl2,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger4',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger4')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						},{	xtype		: 'label',
							text		: '분',
							margin		: '8 0 0 5',
							style		: 'text-align:left; font-size: 2.3em !important;',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'h',
							name		: 'h_valu1',
							xtype		: 'textfield',
							value		: array[0].h_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'h_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].h_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger5',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger5')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'a',
							name		: 'a_valu1',
							xtype		: 'textfield',
							value		: array[0].a_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'a_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].a_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger6',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger6')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'b',
							name		: 'b_valu1',
							xtype		: 'textfield',
							value		: array[0].b_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'b_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].b_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger7',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger7')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'T(두께)',
							name		: 'tick_valu1',
							xtype		: 'textfield',
							value		: array[0].tick_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'tick_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].tick_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger8',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger8')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'W(폭)',
							name		: 'widh_valu1',
							xtype		: 'textfield',
							readOnly	: true,
							value		: array[0].widh_valu1,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'widh_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].widh_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger9',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger9')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: '경도',
							name		: 'make_name',
							xtype		: 'textfield',
							value		: array[0].make_name,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{
							name		: 'long_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger10',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger10')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var values = this.up('form').getValues();
						var lead = values.lead_angl2 + '도' + values.lead_angl3 + '분';
						var selectedRecord = me.getSelectionModel().getSelection()[0];
						var row = me.store.indexOf(selectedRecord);
						store.each(function(record,idx){
							if(idx == row){
								record.set('pitch',values.pitch);
								record.set('lead_angl',lead);
								record.set('h_valu',values.h_valu);
								record.set('a_valu',values.a_valu);
								record.set('b_valu',values.b_valu);
								record.set('tick_valu',values.tick_valu);
								record.set('widh_valu',values.widh_valu);
								record.set('long_valu',values.long_valu);
								record.commit();
							}
						});
						this.up('window').destroy();
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">검사항목 입력</span>',
			closeAction: 'hide',
			width: 700,
			height: 645,
			layout: 'fit',
			resizable: true,
			closable: false,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();

	},

	//불량내역
	poor : function (rec) {
		var me         = this,
			search     = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			store      = me.getStore(),
			poorLookup = new Array()
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
					text		:'불량유형과 수량을 입력하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 62'
				},{	fieldLabel	: Language.get('poor_name', '불량유형'),
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
					labelCls	: 'textTemp '+_global.hq_id+'label',							// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field',							// field에 클래스추가
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
						itemCls	: _global.hq_id+'item'								// lookup list에 클래스 추가
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
							win.destroy();
						}
					},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls		: 'button-style',
						flex	: 1,
						height	:50,
						handler	: function() {
							this.up('form').getForm().reset();
							win.destroy();
						}
					}
				]
		});

		var array;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6000",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point = 4;
		for (var i = 0; i < array.length; i++) {
			form.insert(point,{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array[i].base_name+'</span>',
				cls     : 'poorbutton-style',
				itemId	: i,
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue(array[this.itemId].base_code);
						poor_name.setValue(array[this.itemId].base_name);
					}
				}
			});
			point++;
		}

		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량내역</span>',
			closeAction	: 'hide',
			width		: 581,
			height		: 535,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		},

	fail : function (rec) {
		var me         = this,
			search     = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			store      = me.getStore()
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
					text		: '유실유형과 시간을 선택하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 110'
				},{	fieldLabel	: Language.get('loss_resn_name', '유실유형'),
					labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',												// field에 클래스추가
					xtype		: 'textfield',
					name		: 'loss_resn_name',
					width		: 413,
					height		: 50,
					maxWidth	: 500,
					readOnly	: true,
					labelWidth	: 210,
					margin		: '20 0 0 0'
				},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 100,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							margin		: '0 0 0 70',
							readOnly	: false,
							width		: 220,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'popupfield', editable : true,
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
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
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'popupfield', editable : true,
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						}
					]
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
									console.log(form.getValues());
									me.failupdate(form.getValues());
								}else{
									return;
								}
//								form.getForm().reset();
								win.destroy();
							}
						},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
							cls		: 'button-style',
							flex	: 1,
							height	:50,
							handler	: function() {
								this.up('form').getForm().reset();
								win.destroy();
//								Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
							}
						}
					]
				});
				var array2;
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
					method		: "POST",
					async: false,
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							prnt_idcd	: "6100",
							hqof_idcd	: _global.hqof_idcd,
							stor_grp	: _global.stor_grp
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if(result.records.length){
							array2 = result.records;
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
					}
				});
				console.log(array2);
				var point2 = 4;
				for (var i = 0; i < array2.length; i++) {
					form.insert(point2,						//위치
						{	xtype	: 'button',
							text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array2[i].base_name+'</span>',
							itemId	: i,
							listeners :{
								click : function(){
									var form			= this.up('form'),
										loss_resn_name	= form.down('[name=loss_resn_name]'),
										loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
									;
									loss_resn_dvcd.setValue(array2[this.itemId].base_code);
									loss_resn_name.setValue(array2[this.itemId].base_name);
								}
							},
							cls     : 'failbutton-style',
							width   : 150,
							height  : 50,
							margin  :'30 0 0 30'
						}
					);
					point2++;
				}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
			closeAction	: 'hide',
			width		: 586,
			height		: 610,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
	},

	poorupdate : function (param) {
		var me = this,
			poor_qntt = param.poor_qntt,
			poor_bacd = param.poor_bacd,
			grid      = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
			select    = grid.getSelectionModel().getSelection()[0],
			poor      = Ext.ComponentQuery.query('module-workbookv3-poor')[0],
			line_seqn = 0,
			sttm       = null,
			edtm       = ''
		;
		if(poor_bacd==''||poor_bacd==null){
			Ext.Msg.alert("알림","불량유형을 반드시 선택하여 주십시오.");
		}
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			sttm = Ext.Date.format(new Date(),'YmdHis');
			edtm = Ext.Date.format(new Date(),'YmdHis');

			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv3/get/poorseqn.do',
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
				},
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv3/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: Ext.Date.format(new Date(),'Ymd'),
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

	failupdate : function (param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			loss_resn_dvcd     = param.loss_resn_dvcd,
			sttm      = sttm1.replace(':',''),
			edtm      = '',
			lister    = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
			fail      = Ext.ComponentQuery.query('module-workbookv3-fail')[0],
			select    = lister.getSelectionModel().getSelection()[0],
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
				url		: _global.location.http() + '/prod/order/workbookv3/get/failseqn.do',
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
				url		: _global.location.http() + '/prod/order/workbookv3/set/fail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: Ext.Date.format(new Date(),'Ymd'),
						cvic_idcd		: select.get('cvic_idcd'),
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

	iteminfo : function (select) {
		var me         = this,
			search     = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			poor       = Ext.ComponentQuery.query('module-workbookv3-poor')[0],
			store      = me.getStore()
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
						{	xtype		: 'image',
							name		: 'image',
							id			: 'image',
							src			: '',
							width		: 207,
							height		: 266,
							margin		: '10 0 5 18',
							hidden		: false,
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							value		: select.get('item_imge'),
							listeners	: {
								render:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('acpt_numb','수주번호'),
											name		: 'acpt_numb',
											xtype		: 'textfield',
											value		: select.get('acpt_numb'),
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 112,
											width		: 372,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('work_sttm','작업시간'),
											name		: 'work_sttm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											hideTrigger	: true,
											labelWidth	: 112,
											value		: new Date(select.get('strt_dttm')),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 235,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','~'),
											name		: 'work_edtm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 00 0',
											hideTrigger	: true,
											labelWidth	: 10,
											value		: select.get('edtm_dttm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 133,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code',
											xtype		: 'textfield',
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 112,
											width		: 370,
											value		: select.get('item_code'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('item_name','품명'),
											name		: 'item_name',
											xtype		: 'textfield',
											value		: select.get('item_name'),
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 114,
											width		: 370,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('wkct_numb','지시번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 112,
											width		: 370,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp',
											value		: select.get('invc_numb')
										},{	fieldLabel	: Language.get('lott_numb','LOT번호'),
											name		: 'lott_numb',
											xtype		: 'textfield',
											hideTrigger	: true,
											value		: select.get('lott_numb'),
											readOnly	: true,
											labelWidth	: 114,
											width		: 370,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('qc_poor_qntt','불량수량'),
											name		: 'qc_poor_qntt',
											xtype		: 'numericfield',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 95,
											readOnly	: true,
											width		: 320,
											value		: select.get('qc_poor_qntt'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp',
											hidden		: true
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('wker_name','작업자'),
											name		: 'wker_name',
											xtype		: 'textfield',
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 112,
											width		: 370,
											value		: select.get('wker_name'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('cvic_name','설비명'),
											name		: 'cvic_name',
											xtype		: 'textfield',
											hideTrigger	: true,
											readOnly	: true,
											labelWidth	: 114,
											width		: 370,
											height		: 40,
											hidden		: false,
											value		: select.get('cvic_name'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
												{	fieldLabel	: Language.get('remk_text','비고사항'),
													name		: 'remk_text',
													xtype		: 'textfield',
													labelWidth	: 112,
													hideTrigger	: true,
													readOnly	: true,
													width		: 740,
													value		: select.get('remk_text'),
													height		: 40,
													labelStyle	: 'line-height: 35px;',
													labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
													fieldStyle	: 'text-align: left;font-size:19px !important;',
													cls			: 'textTemp',
												}
											]
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
											items	: [
												{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
													xtype : 'button',
													handler:  function(){
														var lister    = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
															select    = lister.getSelectionModel().getSelection()[0]
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
														var lister    = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
															select    = lister.getSelectionModel().getSelection()[0]
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
										}
									]
								}
							]
				},{	xtype : 'module-workbookv3-poor', region:'west' , flex : 1, height:200 ,margin: '0 0 0 17'
				},{	xtype : 'module-workbookv3-fail',region:'center', flex : 1, height:200 ,margin: '0 17 0 0'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">닫기</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
//						this.up('window').hide();											//창을 숨김
						Ext.ComponentQuery.query('#info')[0].up('window').destroy();		//창을 닫음
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">불량/유실 보고</span>',
			closeAction	: 'hide',
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
});