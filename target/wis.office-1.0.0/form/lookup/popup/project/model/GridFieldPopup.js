Ext.define('lookup.popup.project.model.GridFieldPopup',{ extend:'Axt.data.Model',
    fields: [
         {   name: 'row_no'        , type: 'string'
         },{ name: 'modl_id'       , type: 'string'
         },{ name: 'view_id'       , type: 'string'
         },{ name: 'modl_nm'       , type: 'string'
         },{ name: 'view_nm'       , type: 'string'
         },{ name: 'data_index'    , type: 'string'
         },{ name: 'view_text'     , type: 'string'
         },{ name: 'xtype'         , type: 'string'
         },{ name: 'lnth'          , type: 'float' , defaultValue: 80
         },{ name: 'align'         , type: 'string'
         },{ name: 'sum_type'      , type: 'string'
         },{ name: 'format_str'    , type: 'string'
         },{ name: 'hidden'        , type: 'string'
         },{ name: 'lookup_str'    , type: 'string'
         },{ name: 'remarks'       , type: 'string'
         },{ name: 'tabl_name'        , type: 'string'
         },{ name: 'ord'           , type: 'float' , defaultValue: 0
         }
    ]
});
