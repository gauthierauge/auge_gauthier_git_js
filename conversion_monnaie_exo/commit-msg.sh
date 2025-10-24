#!/bin/bash

COMMIT_MSG=$(cat "$1")

PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .{1,50}"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
    echo "❌ ERREUR: Le message de commit ne respecte pas les conventions !"
    echo ""
    echo "Format attendu:"
    echo "  <type>(<scope>): <description>"
    echo ""
    echo "Types autorisés:"
    echo "  - feat:     Nouvelle fonctionnalité"
    echo "  - fix:      Correction de bug"
    echo "  - docs:     Documentation"
    echo "  - style:    Formatage du code"
    echo "  - refactor: Refactoring"
    echo "  - test:     Ajout/modification de tests"
    echo "  - chore:    Tâches de maintenance"
    echo "  - perf:     Amélioration de performance"
    echo "  - ci:       Intégration continue"
    echo "  - build:    Système de build"
    echo "  - revert:   Annulation d'un commit"
    echo ""
    echo "Exemples valides:"
    echo "  ✅ feat: ajout de la conversion de monnaie"
    echo "  ✅ fix(api): correction de l'appel à l'API"
    echo "  ✅ docs: mise à jour du README"
    echo ""
    echo "Votre message: $COMMIT_MSG"
    exit 1
fi

echo "✅ Message de commit valide poto, j'suis fier de toi!"
exit 0
