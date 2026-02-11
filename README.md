# 機能概要
このツールはPlugin Validator/Standard Nodeで実行しているFlux MonitorのDatafeed JOBの報酬を取得、表示します。

# 前提
Pluginモジュールがセットアップされていない環境でも実行可能です。<br>
Pluginモジュールがセットアップされていない場合、下記にてNode環境を構築してください。

## Nodeセットアップ手順
### NPMインストール
```
cd ~
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```
```
source ~/.nvm/nvm.sh
```
```
nvm install stable --latest-npm
nvm alias default stable
```

# 使い方
## リポジトリのクローン
```
git clone https://github.com/AoiToSouma/pliDatafeedJobs.git
cd pliDatafeedJobs
```

## 環境設定
```
nano allocations.json
```
ご自身の環境に合わせて環境変数を設定します。<br>
複数のNode AddressのDatafeed JOBを確認できます。Node Addressが１つの場合はallocationsは下記のように１つの設定のみとしてください。
```
  "allocations": [
    {
      "nodeAddress": "YOUR_VALIDATOR_NODE_ADDRESS_1",
      "facAddresses": [
        "FLUX_AGGREGATOR_CONTRACT_ADDRESS_1-1",
        "FLUX_AGGREGATOR_CONTRACT_ADDRESS_1-2",
        "FLUX_AGGREGATOR_CONTRACT_ADDRESS_1-3"
      ]
    } 
  ]
```
 - rpc : ブロックチェーンに接続するためのRPCのURL
 - nodeAddress : JOBを実行しているNode Address
 - facAddresses : JOBで定義しているcontractAddress(*1) Standard Nodeの場合、５つのJOBを実行しているので、５つのcontractAddressを記載します。

(*1)contractAddressはGitHubの各Datafeedのソースに記載されているcontractAddressです。
https://github.com/GoPlugin/datafeed_jobs_StandardNodes

## 実行
```
node checkPliDataFeedJobs.js
```
