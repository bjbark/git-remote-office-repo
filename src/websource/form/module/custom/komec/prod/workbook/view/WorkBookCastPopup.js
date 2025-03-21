Ext.define('module.custom.komec.prod.workbook.view.WorkBookCastPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-cast-popup',
	alias	: 'widget.module-komec-workbook-cast-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookCastPopup',

	title	: '<span style="font-size:1.5em !important;">'+Language.get('cast_popup','검사입력')+'</span>',
	closable: true,
	autoShow: true,
	width	: 1260,
	height	: 850,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;

		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				cls: _global.options.work_book_tema+'grid',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel: {selType:'cellmodel'},
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create(me.store),
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				columns: [
					{	dataIndex: 'line_seqn'	, text : Language.get('cond_dvcd_name'	,'NO'	) , width : 40,
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'insp_sbsc_name'		, text : Language.get(''		,'검사항목'	) , width : 200 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'insp_cond'		, text : Language.get('insp_cond'		,'검사규격'		) , flex : 1 , minWidth : 200, align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'msmt_mthd_dvcd'		, text : Language.get('msmt_mthd_dvcd'		,'검사방법'	) , width : 100 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							var arr = resource.lookup('msmt_mthd_dvcd');
							var result;

							var ret = arr.map(function(el){return el[0];}).indexOf(value);

							if(ret !== -1){
								result = arr[ret][1];
							}

							return result?result:value;
						},
					},{	dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , flex : 1 , minWidth : 200, align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'uppr_valu'		, text : Language.get('uppr_valu'		,'상한값'	) , width : 100 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'lwlt_valu'		, text : Language.get('lwlt_valu'		,'하한값'	) , width : 100 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'frst_msmt'		, text : Language.get(''		,'1차'	) , width : 80  , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							var unit = meta.record.get('unit_name');
							var lineSeqn = meta.record.get('line_seqn');
							var inspTypeIdcd = meta.record.get('insp_type_idcd');

							if(unit =='시각'){
								if(value > 0 || value == "0000"){
									return value.substring(0,2)+':'+value.substring(2,4);
								}
							}

							if(value == '1' && inspTypeIdcd == '000034' && lineSeqn == '8'){
								value = '적합';
							}else if(value == '0' && inspTypeIdcd == '000034' && lineSeqn == '8'){
								value = '부적합';
							}

							return value;

						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(comp,event){
									var	trigger1 = Ext.dom.Query.select('.Cast_trigger1')[0];
									var	grids = me.down('grid'),
										select = grids.getSelectionModel().getSelection()[0]
									;
									if(select.get('unit_name')=="시각"){
										this.popup.params = { stor_grp : _global.stor_grp, dvcd:1};
									}else{
										this.popup.params = { stor_grp : _global.stor_grp};
									}
									Ext.get(trigger1).dom.click();
								},
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('frst_msmt',records[0].result);
									if(select.dirty){
										select.set('frst_msmt_chk','Y');
									}else{
										select.set('frst_msmt_chk','N');
									}

									// 상,하한값을 벗어나면 셀 초기화
									var upprValu = parseFloat(select.data.uppr_valu);
									var lwltValu = parseFloat(select.data.lwlt_valu);
									var resultValue = parseFloat(records[0].result);

									if(resultValue > upprValu) {
										Ext.Msg.alert("알림","상한값을 벗어났습니다.");
										select.set('frst_msmt', '')
										return;
									} else if (resultValue < lwltValu) {
										Ext.Msg.alert("알림","하한값을 벗어났습니다.");
										select.set('frst_msmt', '')
										return;
									}

									if(records[0].result == '1' && select.data.line_seqn == '8' && select.data.insp_type_idcd == '000034'){
										select.set('frst_msmt', '적합');
									}

									if(records[0].result == '0' && select.data.line_seqn == '8' && select.data.insp_type_idcd == '000034'){
										select.set('frst_msmt', '부적합');
									}

//									// Commit the changes to ensure they are saved
//									select.commit();

									// Refresh the grid view to reflect the changes
									grids.getView().refresh();

								}
							},
							trigger1Cls : 'hideCls Cast_trigger1',
						}
					},{ dataIndex: 'frst_msmt_2hr'		, text : Language.get(''		,	'2차'	) , width : 80 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							var lineSeqn = meta.record.get('line_seqn');
							var inspTypeIdcd = meta.record.get('insp_type_idcd');

							if(value == '1' && inspTypeIdcd == '000034' && lineSeqn == '8'){
								value = '적합';
							}else if(value == '0' && inspTypeIdcd == '000034' && lineSeqn == '8'){
								value = '부적합';
							}

							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.Cast_trigger2')[0];
									Ext.get(trigger1).dom.click();
								},
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('frst_msmt_2hr',records[0].result);
									if(select.dirty){
										select.set('frst_msmt_2hr_chk','Y');
									}else{
										select.set('frst_msmt_2hr_chk','N');v
									}

									// 상,하한값을 벗어나면 셀 초기화
									var upprValu = parseFloat(select.data.uppr_valu);
									var lwltValu = parseFloat(select.data.lwlt_valu);
									var resultValue = parseFloat(records[0].result);

									if(resultValue > upprValu) {
										Ext.Msg.alert("알림","상한값을 벗어났습니다.");
										select.set('frst_msmt_2hr', '')
										return;
									} else if (resultValue < lwltValu) {
										Ext.Msg.alert("알림","하한값을 벗어났습니다.");
										select.set('frst_msmt_2hr', '')
										return;
									}

									if(records[0].result == '1' && select.data.line_seqn === 8 && select.data.insp_type_idcd == '000034'){
										select.set('frst_msmt_2hr', '적합');
									}

									if(records[0].result == '0' && select.data.line_seqn === 8 && select.data.insp_type_idcd == '000034'){
										select.set('frst_msmt_2hr', '부적합');
									}

//									// Commit the changes to ensure they are saved
//									select.commit();

									// Refresh the grid view to reflect the changes
									grids.getView().refresh();

								}
							},
							trigger1Cls : 'hideCls Cast_trigger2',
						}
					}
				],
				listeners: {
					beforeedit: function(editor, context) {
						var store = context.grid.getStore();
						var currentRecord = store.getAt(context.rowIdx);

						// 현재 행의 이전 행 레코드 가져오기
						var previousRecord = store.getAt(context.rowIdx - 1);

						// 이전 행의 frst_msmt_2hr 값이 비어 있는 경우, 편집을 막음
						if(previousRecord && !previousRecord.get('frst_msmt')){
							return false;
						}else if(previousRecord && !previousRecord.get('frst_msmt_2hr')){
							return false;
						}

						if (context.field === 'frst_msmt_2hr') {
							var frstMsmtValue = context.record.get('frst_msmt');
							if (!frstMsmtValue) {
								Ext.Msg.alert('알림', '1차 측정값이 비어 있습니다.');
								return false; // Prevent editing
							}
						}
					}
				}
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			search	= Ext.ComponentQuery.query('module-komec-workbook-search')[0],
			value	= search.getValues(),
			select	= Ext.ComponentQuery.query('module-komec-workbook-detail')[0].getSelectionModel().getSelection()[0]
		;
		store.load({
			params		: {
				param:JSON.stringify({
					hq_id     : _global.hq_id,
					invc_date : value.work_date,
					item_idcd : me.popup.params.item_idcd,
					invc_numb : me.popup.params.invc_numb
				})
			},
			scope		: me,
			callback	: function(records, operation, success) {

			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			panel		= me.down('grid'),
			store		= panel.getStore()
		;


		Ext.each(store.getUpdatedRecords(),function(rec){
			rec.set('invc_date',Ext.Date.format(new Date(),'Ymd'));
			rec.set('wkct_idcd',me.popup.params.wkct_idcd);
			rec.set('invc_numb',me.popup.params.invc_numb);

			var frstMsmt2hr = rec.get('frst_msmt_2hr');
			if(frstMsmt2hr === '적합'){
				rec.set('frst_msmt_2hr', '1');
			} else if(frstMsmt2hr === '부적합'){
				rec.set('frst_msmt_2hr', '0');
			}

			var frstMsmt = rec.get('frst_msmt');
			if(frstMsmt === '적합'){
				rec.set('frst_msmt', '1');
			} else if(frstMsmt === '부적합'){
				rec.set('frst_msmt', '0');
			}
		});

		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.operations[0].success) {
					me.destroy();
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.destroy();
				}
			}
		});
	},
	Datafomat : function(date){
	    var yyyy = date.getFullYear().toString();
	    var mm = (date.getMonth() + 1).toString();
	    var dd = date.getDate().toString();
	    return yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
	}
});
