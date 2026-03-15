---
title: 更新 MediaWiki 的简单步骤记录
---

## 备份数据库

```bash
mysqldump --user=wikidb_user --password=wikidb_userpassword wikidb > /tmp/mediawiki-backup/file.sql
mysqldump --user=wikidb_user --password=wikidb_userpassword wikidb --xml > /tmp/mediawiki-backup/file.xml
```

## 备份主文件

```bash
sudo cp -r /var/www/wiki /tmp/mediawiki-backup/
```

## 下载并解压新版本

```bash
cd /var/www/ 
sudo wget https://releases.wikimedia.org/mediawiki/1.44/mediawiki-1.44.0.tar.gz
sudo tar xvzf mediawiki-1.44.0.tar.gz
sudo rm mediawiki-1.44.0.tar.gz
```
## 覆盖旧版本

```bash
sudo cp -r /var/www/mediawiki-1.44.0/* /var/www/wiki/
```
## 恢复站点设置和已有图像

```bash
sudo cp /tmp/mediawiki-backup/wiki/LocalSettings.php /var/www/wiki/
sudo cp -r /tmp/mediawiki-backup/wiki/images /var/www/wiki/
```

skins 和 extensions 要额外恢复！不能直接覆盖！！！