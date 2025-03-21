Ext.define('module.custom.komec.prod.workbook.view.WorkBookInptPopup', { extend: 'Axt.popup.Search',
  id 		: 'module-komec-workbook-inpt-popup',
  alias	: 'widget.module-komec-workbook-inpt-popup',
  store	: 'module.custom.komec.prod.workbook.store.WorkBookInptPopup',

  title	: Language.get('item_inpt','제품첨가'),
  closable: true,
  autoShow: true,
  width		: 825,
  height	: 550,
  layout	: {type: 'border'},
  multiSelect: true, // 다중 선택 여부
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
        cls			: _global.options.work_book_tema+'grid',
        multiSelect : true, // 다중 선택 여부
        viewConfig	: { loadMask	: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } ) },
        selModel	: {	selType: 'checkboxmodel', mode :'SINGLE'},
        features	: [ {ftype :'grid-summary'} ],
        plugins 	: { ptype  :'cellediting-directinput', clicksToEdit: 1 },
        store		: Ext.create(me.store),
        dockedItems	: {
          xtype		: 'toolbar',
          dock		: 'bottom',
          items		: [
            {xtype: 'button' , text : '<span class="btnTemp">삭제</span>', iconCls: Const.DELETE.icon , scope: me, handler: me.deleteAction, cls: 'button1-style', width: 150,height:50, margin: ' 0  0  0 20'},'->',
            {xtype: 'button' , text : '<span class="btnTemp">추가</span>', iconCls: Const.UPDATE.icon , scope: me, handler: me.insertAction, cls: 'button-style' , width: 150,height:50, margin: ' 0 10  0  0'},'-',
            {xtype: 'button' , text : '<span class="btnTemp">저장</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style' , width: 150,height:50, margin: ' 0 10  0  0'},'-',
            {xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style' , width: 150,height:50, margin: ' 0  0  0  0'}
          ]
        },
        columns: [
          {	dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 150 ,name:'wkod_numb', hidden:true,
            renderer: function(value, meta){
              meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
              return value;
            },
          },{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'		) , width : 220,name:'lott_numb', align : 'center',
            renderer: function(value, meta){
              meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
              return value;
            },
          },{	dataIndex: 'item_code'		, text : Language.get('item_code'	,'품목코드'	) , width : 120 ,name:'item_code', align : 'center',
            renderer: function(value, meta){
              meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
              return value;
            },
          },{	dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'	) , width : 200 ,name:'item_name', align : 'center',
              renderer: function(value, meta){
                  meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
                  return value;
                },
          },{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'	,'현재고'	) , width : 120 ,name:'item_code', align : 'right',
          renderer: function(value, meta){
              meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
              return value;
            },
          },{	dataIndex: 'qntt'		, text : Language.get(	'qntt'	,'첨가수량'	) , width : 120 ,name:'qntt', align : 'right', summaryType: 'sum' ,
              renderer: function(value, meta){
                  meta.style = 'font-size:2em !important;height:50px;line-height:50px;'; // applied style for DIV element
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
							var trigger1 = Ext.dom.Query.select('.trigger2')[0];
								Ext.get(trigger1).dom.click();
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							var grids 	= me.down('grid');
								qntt	= parseInt(records[0].result);
							  befo_qntt = parseInt(grids.getSelectionModel().getSelection()[0].data.qntt);
							  stok_qntt = parseInt(grids.getSelectionModel().getSelection()[0].data.stok_qntt);
							if(qntt <= befo_qntt+stok_qntt){
								var select = grids.getSelectionModel().getSelection()[0];
								select.set('qntt',records[0].result);
							}else{
								Ext.Msg.show({
								    title	: 'Error',
								    msg		: '첨가수량은 총재고를 넘을수 없습니다.<br><br><br>(아무곳이나 누르세요)',
								    buttons	: Ext.Msg.OK,
								    icon	: Ext.Msg.ERROR,
								    scope	: this,
								    modal	: false
								});
							}
						}
					},
					trigger1Cls : 'hideCls trigger2',
				}
          },{	dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'작업시작일시'	) , width : 100 ,hidden:true,
          },{	dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'work_endd_dttm'), width : 100 ,hidden:true,
          },{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'invc_date'	) , width : 100 ,hidden:true,	name : 'invc_date'
          },{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'wkct_name'	) , width : 100 ,hidden:true,	name : 'wkct_name'
          },{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'line_seqn'	) , width : 100 ,hidden:true,	name : 'line_seqn'
          },{	dataIndex: 'bzpl_idcd'		, text : Language.get('bzpl_idcd'		,'bzpl_idcd'	) , width : 100 ,hidden:true,	name : 'bzpl_idcd'
          },{	dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'		,'acct_bacd'	) , width : 100 ,hidden:true,	name : 'acct_bacd'
          },
        ],
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
      params	:
      		{ param : JSON.stringify(
		      					 { hq_id:_global.hq_id,
						    	   invc_date : value.work_date,
						    	   wkct_idcd:value.wkct_name ,
						    	   item_idcd:select.get('item_idcd'),
						    	   invc_numb:select.get('invc_numb'),
		      					   drtr_idcd:_global.login_id,}
		      					 	)
			},
      scope		: me,
      callback	: function(records, operation, success) {
      }
    });
  },
  /**
   * 추가 버튼 이벤트
   */
	  insertAction: function (grid, rowIndex, colIndex, item, e, record) {
		  var me = this;
		  var store 	= me.down('grid').getStore();
		  	  select	= Ext.ComponentQuery.query('module-komec-workbook-detail')[0].getSelectionModel().getSelection()[0]

		  resource.loadPopup({
		    select: 'MULTI',
		    widget: 'lookup-lott-popup-V2',
		    title: 'LOT No 찾기',
		    params: {
		      stor_grp: _global.stor_grp,
		      line_stat: '0',
		      item_idcd: select.data.item_idcd,
		      stok_type_dvcd: '1',
		      dvcd: '1',
		      qntt: select.data.istt_qntt
		    },
		    result: function (records) {
		      for (var i = 0; i < records.length; i++) {
		        var newRecord = Ext.create('module.custom.komec.prod.workbook.store.WorkBookInptPopup', {
		            lott_numb	 : records[i].get("lott_numb"),
		            item_idcd	 : records[i].get("item_idcd"),
		            stok_qntt	 : records[i].get("stok_qntt"),
		            item_code	 : records[i].get("item_code"),
		            bzpl_idcd	 : records[i].get("bzpl_idcd"),
		            line_seqn	 : records[i].get("line_seqn"),
		            qntt	 	 : records[i].get("qntt"),
		          stok_type_dvcd : records[i].get("stok_type_dvcd"),
		          	wrhs_idcd 	 : records[i].get("wrhs_idcd"),
		          	item_name 	 : records[i].get("item_name"),
		          	acct_bacd 	 : records[i].get("acct_bacd"),
		          	drtr_idcd	 : _global.login_id,
		          	invc_numb	 : select.data.invc_numb,
		          	invc_date	 : select.data.invc_date,
		          	stok_symb	 : "1"
		        });
		        store.insert(i, newRecord);
		      }
		    }
		  });
		},

	  /**
	   * 삭제 버튼 이벤트
	   */
	deleteAction : function (config) {
		 var	 me  = this;
		 	  store	 = me.down('grid').getStore(),
		    records  = me.down('grid').getSelectionModel().getSelection(),
		 	 params  = me.params;
	 	 if(records.length > 0){
		   store.remove (records);
		 for(var i = 0; i<records.length;i++){
			var record = [];
			record.push({lott_numb	: records[i].data.lott_numb,line_seqn	: records[i].data.line_seqn});
			var mask 	= new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/komec/prod/workbook/set/isosdelete.do',
				params	: {
					token : _global.token_id,
					param	: JSON.stringify({
						records : record
					})
				},
				async	: false,
				method	: 'POST',
				success : function(operation){
					store.reload();
					},
				failure : function(operation){ },
				callback: function(operation){  // 성공 실패 관계 없이 호출된다.
					mask.hide();
				}
			});
		 }
	 	 }else{
		  Ext.Msg.alert('알림','삭제할 항목을 선택하세요..');
	     }
	  },

	  /**
	   * 저장 버튼 이벤트
	   */
	  finishAction: function(){
	    var me			= this,
	    	baseform	= me.down('grid'),
	    	store		= baseform.getStore(),
	    	form		= me.down('panel'),
	     	changes		= store.getUpdatedRecords().length,
	     	select		= Ext.ComponentQuery.query('module-komec-workbook-detail')[0].getSelectionModel().getSelection()[0]
	    ;


		for(var i = 0; i<store.getCount();i++){
			store.getAt(i).setDirty(true);
		}

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
